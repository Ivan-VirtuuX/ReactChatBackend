import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from './../../user/schemas/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'fullName' });
  }

  async validate(fullName: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(fullName, password);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }
}
