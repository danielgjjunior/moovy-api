import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movie.module';

@Module({
  imports: [AuthModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
