import { Body, Controller, HttpException, Put } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put()
  async refreshToken(
    @Body() data: RefreshTokenDto,
  ): Promise<{ access_token: string } | HttpException> {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
