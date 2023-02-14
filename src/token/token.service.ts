import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

import { Repository } from 'typeorm';

import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(hash: string, username: string) {
    let objectToken = await this.tokenRepository.findOneBy({
      username: username,
    });
    if (objectToken) {
      this.tokenRepository.update(objectToken.id, {
        hash: hash,
      });
    } else {
      this.tokenRepository.insert({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    let objectToken = await this.tokenRepository.findOneBy({ hash: oldToken });
    if (objectToken) {
      let user = await this.userService.findOne(objectToken.username);

      return this.authService.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Invalid Token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
