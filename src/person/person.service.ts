import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}


  public async create(name: string, fname: string, bdate: Date, bplace: string): Promise<Person>{
    const person = new Person();
    person.name = name;
    person.familyName = fname;
    person.birthDate = bdate;
    person.birthPlace = bplace;

    return this._personRepository.save(person);
  }

  public async mergeUser(idPerson: string, idUser: string) {
    const person = await this._personRepository.findOneBy({idPerson: idPerson});
    const user = await this._userRepository.findOneBy({idUser: idUser});
    person.user = user;

    this._personRepository.save(person);
  }

}
