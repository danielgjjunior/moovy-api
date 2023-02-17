import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,

    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(hash: string, username: string) {
    const objectToken = await this.tokenRepository.findOne({
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
    const objectToken = await this.tokenRepository.findOne({ hash: oldToken });
    if (objectToken) {
      const user = await this.userService.findOne(objectToken.username);

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
