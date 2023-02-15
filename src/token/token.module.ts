import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

import { TokenController } from './token.controller';

import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserModule,
    TypeOrmModule.forFeature([TokenRepository]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
