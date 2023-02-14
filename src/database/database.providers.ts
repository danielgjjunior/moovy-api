import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { Token } from 'src/token/token.entity';
import { Movie } from 'src/movies/movie.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'master',
        password: 'master',
        database: 'moovy',
        entities: [__dirname + '/../**/*.entity{.ts,.js}', User, Token, Movie],
        synchronize: true, //Todas as vezes que eu rodar o nest tentará sincronizar as tabelas = Não usar em produção
      });
      return dataSource.initialize();
    },
  },
];
