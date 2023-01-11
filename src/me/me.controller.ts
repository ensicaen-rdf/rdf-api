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
    const idPerson = await this._meRepository.getIdPerson(req.user.idUser)

    return {
      "username": req.user.username,
      "idPerson": idPerson,
      "idUser": req.user.idUser
    };
  }
}
