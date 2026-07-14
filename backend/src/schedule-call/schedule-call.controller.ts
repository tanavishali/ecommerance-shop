import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ScheduleCallService } from './schedule-call.service';
import { CreateScheduleCallDto } from './dto/create-schedule-call.dto';
import { UpdateScheduleCallStatusDto } from './dto/update-schedule-call-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Schedule Call')
@Controller('schedule-call')
export class ScheduleCallController {
  constructor(private readonly scheduleCallService: ScheduleCallService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a schedule-a-call request (public, from the marketing site)' })
  create(@Body() dto: CreateScheduleCallDto) {
    return this.scheduleCallService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all schedule-a-call requests (admin only)' })
  findAll() {
    return this.scheduleCallService.findAll();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a schedule-a-call request status (admin only)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateScheduleCallStatusDto) {
    return this.scheduleCallService.updateStatus(id, dto.status);
  }
}
