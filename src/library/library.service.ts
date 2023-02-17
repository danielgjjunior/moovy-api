/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ResultsDTO } from 'src/dto/results.dto';
import { Library } from './library.entity';
import { LibraryRepository } from './library.repository';

@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async adduserMovie(userId, movieId): Promise<ResultsDTO | void> {
    const library = new Library();
    library.movieId = movieId;
    library.userId = userId;
    console.log(library);

    const res = await this.libraryRepository.save(library);

    console.log(res);
  }

  async listAllMovies(query): Promise<Library[]> {
    console.log(query.userId);
    return this.libraryRepository.find({
      userId: query.userId,
    });
  }
}
