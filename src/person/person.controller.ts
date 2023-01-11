import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PersonService } from './person.service';

import { CreatePersonDto } from './dto/create-person.dto'
import { PersonDto } from './dto/person.dto'
import { MergeUserDto } from './dto/merge-user.dto'

@Controller('person')
@ApiTags('person')
export class PersonController {
  constructor(private readonly _personRepository: PersonService) {}


  @Post("create")
  public async createPerson(@Body() CreatePersonDto: CreatePersonDto): Promise<PersonDto> {
    const person = await this._personRepository.create(CreatePersonDto.name, CreatePersonDto.familyName, CreatePersonDto.birthDate, CreatePersonDto.birthPlace);
    return new PersonDto(person);
  }

  @Post("merge")
  public async mergeWithUser(@Body() MergeUserDto: MergeUserDto) {
    return await this._personRepository.mergeUser(MergeUserDto.idPerson, MergeUserDto.idUser);
  }
}
