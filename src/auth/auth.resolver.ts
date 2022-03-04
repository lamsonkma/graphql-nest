import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { LoginResponse } from './dto/login-response';
import { LoginOwnerInput } from './dto/login-auth.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';
import { JwtAuthGuard } from './guard/jwt-auth-guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginOwnerInput') loginOwnerInput: LoginOwnerInput) {
    return this.authService.signin(loginOwnerInput);
  }

  @Mutation(() => Owner)
  signup(@Args('signinOwnerInput') signinOwnerInput: CreateOwnerInput) {
    return this.authService.signup(signinOwnerInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Owner, { name: 'token' })
  verifyToken(@Args('token') token: string) {
    return this.authService.verify(token);
  }
}
