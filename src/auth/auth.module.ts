import { readFile } from 'fs/promises';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../database/entities/user.model';
import { ConfigSchema } from '../lib/config-schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'player',
      session: false,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigSchema>) => ({
        privateKey: await readFile(configService.get('JWT_PRIVATE_KEY_PATH')),
        publicKey: await readFile(configService.get('JWT_PUBLIC_KEY_PATH')),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
