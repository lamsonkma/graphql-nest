import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';

import { PayloadDto } from './dto/payload-dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async valdateOwner(email: string, password: string) {
    const owner = await this.ownerService.findByEmail(email);
    if (owner) {
      const [salt, storedHash] = owner.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      if (storedHash === hash.toString('hex')) {
        return owner;
      }
    }
    return null;
  }
  async signin(ownerInput: Pick<Owner, 'email' | 'password'>) {
    const owner = await this.valdateOwner(
      ownerInput.email,
      ownerInput.password,
    );

    if (!owner) {
      throw new UnauthorizedException('Email or Password invalid');
    }
    return {
      access_token: this.accessToken(owner),
      refresh_token: this.refreshToken(owner),
    };
  }
  async signup(owner: CreateOwnerInput) {
    const findOwner = await this.ownerService.findByEmail(owner.email);
    if (!findOwner) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(owner.password, salt, 32)) as Buffer;
      owner.password = salt + '.' + hash.toString('hex');
      return await this.ownerService.create(owner);
    } else {
      throw new BadRequestException('owner already exits');
    }
  }

  async getAllOwner() {
    return this.ownerService.findAll();
  }

  async verify(token: string) {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: 'lamsonkma',
      });
      const owner = await this.ownerService.findByEmail(decoded.email);
      if (!owner) {
        throw new Error('Unable to get the owner from decoded token.');
      }
      return owner;
    } catch (error) {
      console.log(error);
    }
  }

  async accessToken(payload: PayloadDto) {
    const accessToken = this.jwtService.sign(
      {
        email: payload.email,
        name: payload.name,
      },
      {
        expiresIn: '3m',
        secret: 'lamsonkma',
      },
    );
    return accessToken;
  }
  async refreshToken(payload: PayloadDto) {
    const refreshToken = this.jwtService.sign(
      {
        email: payload.email,
        name: payload.name,
      },
      {
        expiresIn: '5m',
        secret: 'lamson2000',
      },
    );
    return refreshToken;
  }
}
