import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ResultsDTO } from 'src/dto/results.dto';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: UserCreateDTO): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = bcrypt.hashSync(data.password, 8);

    const existentUSer = await this.userRepository.findOne({
      email: data.email,
    });

    if (!existentUSer) {
      return this.userRepository.save(user);
    } else {
      throw new ConflictException('User already exists');
    }
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }
}
