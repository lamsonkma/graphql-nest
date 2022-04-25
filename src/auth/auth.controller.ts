import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/guard/local-auth-guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    const { email, password } = req.body;
    return this.authService.signin({ email, password });
  }
}
