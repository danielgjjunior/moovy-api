import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
        LibraryController, ],
  providers: [
        LibraryService, ],
})
export class LibraryModule {}
