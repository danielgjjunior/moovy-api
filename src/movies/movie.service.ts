import { Injectable, Inject, Query } from '@nestjs/common';
import { title } from 'process';
import { ResultsDTO } from 'src/dto/results.dto';
import { Library } from 'src/library/library.entity';
import { LibraryService } from 'src/library/library.service';
import { Repository } from 'typeorm';
import { MovieCreateDTO } from './dto/movie.create.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly libraryService: LibraryService,
  ) {}

  async listAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  /*
  async addMovie(imdbID) {
    return this.movieRepository.findOne({ imdbID: imdbID });
  }

  async listUserMovies(query): Promise<Movie[]> {
    console.log(query.userId);
    console.log();
    return this.movieRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: query.userId,
        },
      },
    });
    
  }

  */

  async save(data: MovieCreateDTO, userID): Promise<ResultsDTO | void> {
    const movie = new Movie();
    (movie.title = data.title),
      (movie.year = data.year),
      (movie.genre = data.genre),
      (movie.director = data.director),
      (movie.writer = data.writer),
      (movie.imdbRating = data.imdbRating),
      (movie.imdbID = data.imdbID),
      (movie.posterUrl = data.posterUrl);

    let verifyifExists = await this.movieRepository.findOne({
      imdbID: movie.imdbID,
    });
    console.log(userID);
    if (verifyifExists) {
      return this.libraryService.adduserMovie(userID.userId, verifyifExists.id);
    } else {
      this.movieRepository.save(movie).then(async (result) => {
        verifyifExists = await this.movieRepository.findOne({
          imdbID: movie.imdbID,
        });
        const user = userID.userId;
        const movieID = verifyifExists.id;

        return this.libraryService.adduserMovie(user, movieID);
      });
    }
  }
  async remove(movieId) {
    console.log(movieId);
    return this.movieRepository.delete(movieId);
  }
}
