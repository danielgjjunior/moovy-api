import { Injectable, Inject, Query } from '@nestjs/common';
import { title } from 'process';
import { ResultsDTO } from 'src/dto/results.dto';
import { LibraryService } from 'src/library/library.service';
import { Repository } from 'typeorm';
import { MovieCreateDTO } from './dto/movie.create.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async listAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  /*
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

  async addMovie(data: MovieCreateDTO) {
    await this.movieRepository.findOne({});
    await this.movieRepository.findOne(data.imdbID);
    console.log(this.movieRepository.findOne);
    if (this.movieRepository.findOne) {
      return <ResultsDTO>{
        status: true,
        message: 'Sucesso',
      };
    } else {
      return <ResultsDTO>{
        status: false,
        message: 'Houve um erro ao adicionar o filme na biblioteca',
      };
    }
  }

  async save(data: MovieCreateDTO): Promise<ResultsDTO> {
    let movie = new Movie();
    (movie.title = data.title),
      (movie.year = data.year),
      (movie.genre = data.genre),
      (movie.director = data.director),
      (movie.writer = data.writer),
      (movie.imdbRating = data.imdbRating),
      (movie.imdbID = data.imdbID),
      (movie.posterUrl = data.posterUrl);

    return this.movieRepository
      .save(movie)
      .then((result) => {
        return <ResultsDTO>{
          status: true,
          message: 'Filme Adicionado com sucesso',
        };
      })
      .catch((error) => {
        return <ResultsDTO>{
          status: false,
          message: 'Houve um erro ao adicionar o filme na biblioteca',
        };
      });
  }

  async remove(movieId) {
    console.log(movieId);
    return this.movieRepository.delete(movieId);
  }
}
