import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { OwnersService } from 'src/owners/owners.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private ownerService: OwnersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'lamsonkma',
      ignoreExpiration: false,
    });
  }
  validate(validatePayload: { email: string; id: number }) {
    return this.ownerService.findByEmail(validatePayload.email);
  }
}
