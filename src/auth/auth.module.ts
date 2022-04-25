import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { OwnersModule } from 'src/owners/owners.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { LocalStrategy } from './strategies';
@Module({
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    LocalStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [
    ConfigModule,
    OwnersModule,
    PassportModule,
    JwtModule.register({
      secret: 'lamson2000',
      signOptions: { expiresIn: 3600 },
    }),
  ],
})
export class AuthModule {}
