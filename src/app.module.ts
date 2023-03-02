import { LibraryModule } from './library/library.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './library/library.entity';
import { Movie } from './movies/movie.entity';
import { Token } from './token/token.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LibraryModule,
    AuthModule,
    MovieModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'master',
      password: 'master',
      database: 'moovy',
      entities: [User, Token, Library, Movie],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
