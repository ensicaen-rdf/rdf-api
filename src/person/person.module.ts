import { PersonCsse } from 'src/database/entities/person-csse.model';
import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonLocalisation } from '../database/entities/person-localisation.model';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person, User, PersonLocalisation, PersonCsse])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
