import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../database/entities/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

  public async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this._userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const isPasswordMatching = await compare(password, user.password);
    if (isPasswordMatching) {
      return user;
    }

    return null;
  }
}
