import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { MovieCreateDTO } from 'src/movies/dto/movie.create.dto';
import { LibraryDto } from './dto/library.dto';
import { Library } from './library.entity';
import { LibraryService } from './library.service';
import { LibraryMapper } from './mapper/library.mapper';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  async listUserMovies(@Query() query): Promise<LibraryDto[]> {
    const res = await this.libraryService.listUserMovies(query);
    const arr: LibraryDto[] = [];
    for (let i = 0; i <= res.length - 1; i++) {
      arr.push(LibraryMapper.fromEntityToDto(res[i]));
    }
    return arr;
  }
  @Post()
  async saveUserMovie(
    @Body() data: MovieCreateDTO,
    @Query() userID: { userId: string },
  ): Promise<Library> {
    return this.libraryService.saveUserMovie(data, userID);
  }

  @Delete()
  remove(@Query() query) {
    return this.libraryService.remove(query);
  }
}
