import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserLoggedDto } from './dto/user-logged.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  public async login(@Body() userLoginDto: UserLoginDto): Promise<UserLoggedDto> {
    const user = await this._authService.validateUser(userLoginDto.username, userLoginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this._authService.createToken(user);
    return new UserLoggedDto(token, user);
  }
}
