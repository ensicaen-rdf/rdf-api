import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/database/entities/person.model';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(Person) private readonly _personRepository: Repository<Person>,
  ) {}

  public async getIdPerson(idUser: string): Promise<string> {

    const person = await this._personRepository.findOneBy({idUser: idUser});
    return person === null ? "not linked" : person.idPerson;

  }
  
}
