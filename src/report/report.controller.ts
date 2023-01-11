import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags("report")
export class ReportController {
  constructor(private readonly _reportRepository: ReportService){}

  @Get()
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
  public async create(@Body() CreateReportDto: CreateReportDto, @Req() request: Request): Promise<ReportDto> {
    const report = await this._reportRepository.create(request.user.id, CreateReportDto.idPersonTarget, CreateReportDto.reason);
    return new ReportDto(report);
  }

}
