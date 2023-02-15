import { LibraryModule } from './library/library.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './database/database.config';
import { Library } from './library/library.entity';
import { Movie } from './movies/movie.entity';
import { Token } from './token/token.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    LibraryModule,
    AuthModule,
    MovieModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'master',
      database: 'moovy',
      entities: [User, Token, Movie, Library],
      synchronize: true, //Todas as vezes que eu rodar o nest tentará sincronizar as tabelas = Não usar em produção
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
