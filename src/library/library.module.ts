import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryRepository } from './library.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryRepository])],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
