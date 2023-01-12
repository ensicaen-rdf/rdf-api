import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';
import { ValidateReportDto } from './dto/validate-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(private readonly _reportRepository: ReportService) {}

  @Get('all')
  public async findAll() {
    return await this._reportRepository.getAll();
  }

  @Get(':from')
  public async findReportFrom(@Param('from') id: string): Promise<ReportDto[]> {
    return await this._reportRepository.findReportFrom(id);
  }

  @Get(':for')
  public async findReporFor(@Param('for') id: string): Promise<ReportDto[]> {
    return await this._reportRepository.findReportConcerning(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async create(@Body() CreateReportDto: CreateReportDto, @Req() request: Request): Promise<ReportDto> {
    const report = await this._reportRepository.create(request.user.idUser, CreateReportDto.idPersonTarget, CreateReportDto.reason);
    return new ReportDto(report);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get treated repports' })
  public async getReportUntreated(): Promise<ReportDto[]> {
    const reports = await this._reportRepository.getReportUntreated();
    return reports;
  }

  @Post('validate')
  public async validateReport(@Body() ValidateReportDto: ValidateReportDto) {
    return await this._reportRepository.validate(ValidateReportDto.idReport, ValidateReportDto.isValid, ValidateReportDto.nbPoints);
  }
}
