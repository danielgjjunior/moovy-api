/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { MovieCreateDTO } from 'src/movies/dto/movie.create.dto';
import { MovieService } from 'src/movies/movie.service';

import { Library } from './library.entity';
import { LibraryRepository } from './library.repository';

@Injectable()
export class LibraryService {
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly movieService: MovieService,
  ) {}

  async listUserMovies(query): Promise<Library[]> {
    return this.libraryRepository.find({
      userId: query.userId,
    });
  }

  async saveUserMovie(data: MovieCreateDTO, userID): Promise<Library> {
    const callRegisterMovie = await this.movieService.saveMovie(data);
    if (callRegisterMovie) {
      return await this.adduserMovie(userID.userId, callRegisterMovie);
    } else {
      throw new HttpException('Error Inserting Movie', 500);
    }
  }

  async adduserMovie(userId, movieId): Promise<Library> {
    const library = new Library();
    library.movieId = movieId;
    library.userId = userId;
    const res = await this.libraryRepository.save(library);
    if (res) {
      return library;
    } else {
      throw new HttpException('error inserting userMovie', 500);
    }
  }

  async remove(query) {
    const id = await this.libraryRepository.findOne(query);
    if (!id) {
      throw new HttpException('Error movie not found', 500);
    } else {
      return this.libraryRepository.delete(id);
    }
  }
}
