import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigSchema } from '../lib/config-schema';
import { DatabasePopulateService } from './database-populate.service';
import { Camera } from './entities/camera.model';
import { PersonCsse } from './entities/person-csse.model';
import { PersonLocalisation } from './entities/person-localisation.model';
import { PersonStats } from './entities/person-stats.model';
import { Person } from './entities/person.model';
import { Report } from './entities/report.model';
import { User } from './entities/user.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [Person, User, PersonCsse, PersonStats, PersonLocalisation, Report, Camera],
      }),
    }),
  ],
  exports: [TypeOrmModule],
  providers: [DatabasePopulateService],
})
export class DatabaseModule {
  constructor(private readonly _databasePopulateService: DatabasePopulateService) {
    this._databasePopulateService.populate();
  }
}
