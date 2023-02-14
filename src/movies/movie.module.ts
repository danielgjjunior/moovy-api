import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { movieProviders } from './movie.providers';
import { MovieService } from './movie.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [...movieProviders, MovieService],
  exports: [MovieService],
})
export class MovieModule {}
