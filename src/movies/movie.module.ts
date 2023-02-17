import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { LibraryModule } from 'src/library/library.module';
import { LibraryService } from 'src/library/library.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository]), LibraryModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
