import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryRepository } from './library.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryRepository])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
