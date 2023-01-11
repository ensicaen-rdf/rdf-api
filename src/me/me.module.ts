import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from '../database/entities/person.model';
import { User } from '../database/entities/user.model';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Person])],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
