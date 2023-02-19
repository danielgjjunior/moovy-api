import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.auth.guard';
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
