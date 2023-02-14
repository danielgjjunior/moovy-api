import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.auth.guard';
import { ResultsDTO } from '../dto/results.dto';
import { MovieCreateDTO } from './dto/movie.create.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /*
  @Get()
  async listAllMovies(): Promise<Movie[]>{
    return this.movieService.listAllMovies() 
  }
  

  @Get('userMovies')
  async listUserMovies(@Query() query): Promise<Movie[]> {
    return this.movieService.listUserMovies(query);
  }

  */
 
  @Post()
  async add(@Body() data: MovieCreateDTO): Promise<ResultsDTO> {
    return this.movieService.addMovie(data);
  }

  @Delete()
  remove(@Query() query) {
    return this.movieService.remove(query.movieId);
  }
}
