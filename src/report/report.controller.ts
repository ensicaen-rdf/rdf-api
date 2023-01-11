import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateReportDto } from './dto/create-report.dto';

@Controller('report')
export class ReportController {
  @Get()
  findAll(): string {
    return 'This action returns all reports';
  }

  @Get(':from')
  findOneFrom(@Param('from') id: string): string {
    //make request
    //return result
    return 'This action returns all reports emitted from #${id}';
  }

  @Get(':to')
  findOneTo(@Param('to') id: string): string {
    //make request
    //return result
    return 'This action returns all reports concerning #${id}';
  }

  @Post()
  async create(@Body() CreateReportDto: CreateReportDto) {
    return 'This action create a new report !';
  }
}
