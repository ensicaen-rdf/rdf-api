import { Person } from 'src/database/entities/person.model';
import { User } from 'src/database/entities/user.model';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MeService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

  public async getPersonFromUser(idUser: string): Promise<Person> {
    const user = await this._userRepository.findOne({ where: { idUser }, relations: ['person'] });
    return user.person;
  }
}
