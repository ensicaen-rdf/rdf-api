import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonCsse } from 'src/database/entities/person-csse.model';
import { Person } from 'src/database/entities/person.model';

import { Report } from '../database/entities/report.model';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Person, PersonCsse])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
