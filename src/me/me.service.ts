import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';
import { PersonDto } from 'src/person/dto/person.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @InjectRepository(User) private readonly _personRepository: Repository<Person>,
  ) {}

  public async getPerson(idUser: string): Promise<PersonDto> {

    const user = await this._userRepository.findOneBy({idUser: idUser});
    const pers = await this._personRepository.findOneBy({idPerson: user.idPerson});
    return new PersonDto(pers);

  }
  
}
