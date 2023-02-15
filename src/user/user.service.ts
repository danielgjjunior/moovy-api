import { Injectable, Inject } from '@nestjs/common';
import { ResultsDTO } from 'src/dto/results.dto';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: UserCreateDTO): Promise<ResultsDTO> {
    let user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = bcrypt.hashSync(data.password, 8);

    return this.userRepository
      .save(user)
      .then((result) => {
        return <ResultsDTO>{
          status: true,
          message: 'Usuário cadastrado com sucesso',
        };
      })
      .catch((error) => {
        return <ResultsDTO>{
          status: false,
          message: 'Houve um erro ao cadastrar usuário',
        };
      });
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }
}
