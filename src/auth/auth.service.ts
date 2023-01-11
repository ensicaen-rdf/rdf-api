import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../database/entities/user.model';
import { Payload } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private _jwtService: JwtService,
    private _configService: ConfigService,
  ) {}

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

  public async createToken(user: User): Promise<string> {
    const payload: Payload = {
      idUser: user.idUser,
      username: user.username,
    };

    const token = this._jwtService.sign(payload, {
      expiresIn: '1d',
      algorithm: 'RS256',
    });

    return token;
  }
}
