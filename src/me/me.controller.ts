import { Request } from 'express';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PersonDto } from '../person/dto/person.dto';
import { PersonService } from '../person/person.service';

@Controller('me')
@ApiTags('me')
export class MeController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getMe(@Req() req: Request): Promise<PersonDto> {
    const person = await this._personService.getPerson(req.user.idPerson);
    return new PersonDto(person);
  }
}
