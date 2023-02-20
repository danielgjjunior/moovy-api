import { Controller, Get } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get() //Somente para testes
  async listAllMovies(): Promise<Movie[]> {
    return this.movieService.listAllMovies();
  }
}
