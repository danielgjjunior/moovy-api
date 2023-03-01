import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryRepository } from './library.repository';
import { MovieModule } from 'src/movies/movie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibraryRepository]),
    forwardRef(() => MovieModule),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
