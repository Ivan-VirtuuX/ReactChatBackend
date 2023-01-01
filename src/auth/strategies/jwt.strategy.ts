import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { sub: number; fullName: string }) {
    const data = {
      id: payload.sub,
      fullName: payload.fullName,
    };

    const user = await this.userService.findByCond(data);

    if (!user) {
      throw new UnauthorizedException('Нет доступа к данной странице');
    }
    return {
      _id: user._id,
      id: user.userId,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }
}
