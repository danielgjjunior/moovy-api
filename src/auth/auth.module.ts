import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './estrategies/auth.jwt.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './estrategies/local.estrategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
