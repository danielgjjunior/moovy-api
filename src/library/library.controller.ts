import { Controller, Get, Query } from '@nestjs/common';
import { Library } from './library.entity';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}
  @Get()
  async listAllMovies(@Query() query): Promise<Library[]> {
    return this.libraryService.listAllMovies(query);
  }
}
