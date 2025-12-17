import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_DS', // hedha لازم نفس secret li fi AuthModule
    });
  }

  async validate(payload: any) {
    // hedha يرجّع user info fi req.user
    return payload; // { id, role }
  }
}
