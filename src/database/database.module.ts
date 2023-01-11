import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigSchema } from '../lib/config-schema';
import { Camera } from './entities/camera.model';
import { PersonCsse } from './entities/person-csse.model';
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
        entities: [Person, User, PersonCsse, PersonStats, Report, Camera],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
