import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.model';
import { Person } from 'src/database/entities/person.model';

import { PersonController } from './person.controller';
import { PersonService } from './person.service'

@Module({
  imports: [TypeOrmModule.forFeature([Person, User])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
