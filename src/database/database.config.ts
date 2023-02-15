import { User } from 'src/user/user.entity';
import { Token } from 'src/token/token.entity';
import { Movie } from 'src/movies/movie.entity';
import { Library } from 'src/library/library.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'master',
  password: 'master',
  database: 'moovy',
  entities: [__dirname + '/../**/*.entity{.ts,.js}', User, Token, Movie,Library],
  synchronize: true, //Todas as vezes que eu rodar o nest tentará sincronizar as tabelas = Não usar em produção
}
export = typeOrmConfig;
