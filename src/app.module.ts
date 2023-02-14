import { LibraryModule } from './library/library.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movie.module';

@Module({
  imports: [LibraryModule, AuthModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
