import { Request } from 'express';

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddStepsDto } from '../person/dto/add-steps.dto';
import { PersonLocalisationDto } from '../person/dto/person-localisation.dto';
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
    const csse = await this._personService.getCsse(req.user.idPerson);
    return new PersonDto(person, csse);
  }

  @Get('steps')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getPersonSteps(@Req() req: Request): Promise<number> {
    return await this._personService.getSteps(req.user.idPerson);
  }

  @Post('steps')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async addPersonSteps(@Req() req: Request, @Body() steps: AddStepsDto): Promise<void> {
    await this._personService.addSteps(req.user.idPerson, steps.steps);
  }

  @Get('csse')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getPersonCSSE(@Req() req: Request): Promise<number> {
    return await this._personService.getCsse(req.user.idPerson);
  }

  @Get('localisation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getPersonLocalisation(@Req() req: Request): Promise<PersonLocalisationDto> {
    const localisation = await this._personService.getLocalisation(req.user.idPerson);
    return new PersonLocalisationDto(localisation);
  }

  @Post('localisation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async setPersonLocalisation(@Req() req: Request, @Body() localisation: PersonLocalisationDto): Promise<void> {
    await this._personService.setLocalisation(req.user.idPerson, localisation.latitude, localisation.longitude);
  }
}
