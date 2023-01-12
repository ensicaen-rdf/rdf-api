import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AddStepsDto } from './dto/add-steps.dto';
import { PersonDto } from './dto/person.dto';
import { PersonService } from './person.service';

@Controller('people')
@ApiTags('people')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  // @Post()
  // public async createPerson(@Body() cpd: CreatePersonDto): Promise<PersonDto> {
  //   const person = await this._personRepository.create(
  //     cpd.nationalId,
  //     cpd.lastName,
  //     cpd.firstNames,
  //     new Date(Date.parse(cpd.dateOfBirth)),
  //     cpd.placeOfBirth,
  //     cpd.address,
  //     cpd.city,
  //     cpd.country,
  //     cpd.eyesColour,
  //     cpd.height,
  //     cpd.weight,
  //     cpd.photo,
  //     cpd.iris,
  //     cpd.fingerprints,
  //     cpd.socialSecurityNumber,
  //     cpd.pathologies,
  //     cpd.bloodType,
  //     cpd.bloodRhesus,
  //     cpd.placeOfWork,
  //     cpd.companyName,
  //   );

  //   if (cpd.idUser) {
  //     this._personRepository.mergeUser(person.idPerson, cpd.idUser);
  //   }
  //   return new PersonDto(person);
  // }

  // @Post('merge')
  // public async mergeWithUser(@Body() MergeUserDto: MergeUserDto) {
  //   return await this._personRepository.mergeUser(MergeUserDto.idPerson, MergeUserDto.idUser);
  // }

  @Get()
  public async getAll(): Promise<PersonDto[]> {
    const people = await this._personService.getAll();
    return people.map((person) => new PersonDto(person));
  }

  @Get(':idPerson')
  public async getPerson(@Param('idPerson') idPerson: string): Promise<PersonDto> {
    const person = await this._personService.getPerson(idPerson);
    return new PersonDto(person);
  }

  @Get(':idPerson/steps')
  public async getPersonSteps(@Param('idPerson') idPerson: string): Promise<number> {
    return await this._personService.getSteps(idPerson);
  }

  @Post(':idPerson/steps')
  public async addPersonSteps(@Param('idPerson') idPerson: string, @Body() steps: AddStepsDto): Promise<void> {
    await this._personService.addSteps(idPerson, steps.steps);
  }

  @Get(':idPerson/csse')
  public async getPersonCSSE(@Param('idPerson') idPerson: string): Promise<number> {
    return await this._personService.getCsse(idPerson);
  }
}
