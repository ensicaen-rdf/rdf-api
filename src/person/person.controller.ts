import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PersonService } from './person.service';

import { CreatePersonDto } from './dto/create-person.dto'
import { PersonDto } from './dto/person.dto'
import { MergeUserDto } from './dto/merge-user.dto'

@Controller('people')
@ApiTags('people')
export class PersonController {
  constructor(private readonly _personRepository: PersonService) {}


  @Post()
  public async createPerson(@Body() cpd: CreatePersonDto): Promise<PersonDto> {
    const person = await this._personRepository.create(
      cpd.nationalId,
      cpd.lastName,
      cpd.firstNames,
      new Date(Date.parse(cpd.dateOfBirth)),
      cpd.placeOfBirth,
      cpd.address,
      cpd.city,
      cpd.country,
      cpd.eyesColour,
      cpd.height,
      cpd.weight,
      cpd.photo,
      cpd.iris,
      cpd.fingerprints,
      cpd.socialSecurityNumber,
      cpd.pathologies,
      cpd.bloodType,
      cpd.bloodRhesus,
      cpd.placeOfWork,
      cpd.companyName);
    
    if (cpd.idUser) {
      this._personRepository.mergeUser(person.idPerson, cpd.idUser);
    }
    return new PersonDto(person);
  }

  @Post("merge")
  public async mergeWithUser(@Body() MergeUserDto: MergeUserDto) {
    return await this._personRepository.mergeUser(MergeUserDto.idPerson, MergeUserDto.idUser);
  }

  @Get()
  public async getAll(): Promise<PersonDto[]> {
    return await this._personRepository.getAll();
  }
}
