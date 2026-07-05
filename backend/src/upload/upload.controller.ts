import {
  Controller, Post, UseInterceptors, UploadedFile,
  UseGuards, BadRequestException, Get, Param, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

const storage = diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + extname(file.originalname));
  },
});

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  @Post('image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file', {
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
        return cb(new BadRequestException('Only image files are allowed'), false);
      }
      cb(null, true);
    },
  }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload a product image (admin only, max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    return { url: `http://localhost:3001/api/upload/files/${file.filename}` };
  }

  @Get('files/:filename')
  @ApiOperation({ summary: 'Serve uploaded image file' })
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    // Orphaned image (file deleted or never present on this machine): respond
    // with a clean 404 instead of letting sendFile throw an unhandled ENOENT.
    if (!existsSync(filePath)) {
      res.status(404).json({ statusCode: 404, message: 'Image not found' });
      return;
    }
    res.sendFile(filePath, (err) => {
      if (err && !res.headersSent) res.status(404).end();
    });
  }
}
