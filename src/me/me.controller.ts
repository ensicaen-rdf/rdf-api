import { Request } from 'express';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MeService } from './me.service';

@Controller('me')
@ApiTags('me')
export class MeController {

  constructor(private readonly _meRepository: MeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getMe(@Req() req: Request) {
    const person = await this._meRepository.getPerson(req.user.idUser)

    return {
      "user": req.user,
      "person": person
    };
  }
}
