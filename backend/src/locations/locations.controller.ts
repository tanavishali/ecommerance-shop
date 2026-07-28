import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LocationsService, VisitorLocationResponse } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiOperation({ summary: 'Report the current visitor location (guest or logged-in)' })
  create(@Body() dto: CreateLocationDto, @Request() req: any) {
    const userId = req.user?._id?.toString() ?? null;
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip ?? null;
    const userAgent = req.headers['user-agent'] ?? null;
    return this.locationsService.upsert(dto, userId, ip, userAgent);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List the current location of every tracked visitor (admin only)' })
  findAll(): Promise<VisitorLocationResponse[]> {
    return this.locationsService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tracked location record (admin only)' })
  remove(@Param('id') id: string): Promise<void> {
    return this.locationsService.remove(id);
  }
}
