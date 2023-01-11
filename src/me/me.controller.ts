import { Request } from 'express';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('me')
@ApiTags('me')
export class MeController {
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getMe(@Req() req: Request): Promise<string> {
    return req.user.username;
  }
}
