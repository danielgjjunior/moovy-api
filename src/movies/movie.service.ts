import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { MovieCreateDTO } from './dto/movie.create.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { LibraryService } from '../library/library.service';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async saveMovie(data: MovieCreateDTO) {
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

    if (!verifyifExists) {
      await this.movieRepository.save(movie);
      verifyifExists = await this.movieRepository.findOne({
        imdbID: movie.imdbID,
      });
    }
    const savedMovieId = verifyifExists.id;
    return savedMovieId;
  }
}
