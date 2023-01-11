import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ReportModule } from './report/report.module';
import { configSchema } from './lib/config-schema';
import { MeModule } from './me/me.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    ReportModule,
    UsersModule,
    AuthModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
