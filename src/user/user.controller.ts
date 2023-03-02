import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserCreateDTO } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserMapper } from './mapper/user.mapper';
import { UserReturnDTO } from './dto/user.return.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async listAllUsers(): Promise<User[]> {
    return this.userService.listAllUsers();
  }
  @Post()
  async cadastrar(@Body() data: UserCreateDTO): Promise<UserReturnDTO> {
    const res = await this.userService.createUser(data);
    return UserMapper.fromEntityToDto(res);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
