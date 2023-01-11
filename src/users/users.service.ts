import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from '../auth/auth.service';
import { Person } from '../database/entities/person.model';
import { User } from '../database/entities/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>, private readonly _authService: AuthService) {}

  public async createUser(username: string, password: string, person?: Person): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = await this._authService.hashPassword(password);
    user.person = person;
    return this._userRepository.save(user);
  }
}
