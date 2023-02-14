import { Injectable, Inject, Query } from '@nestjs/common';
import { ResultsDTO } from 'src/dto/results.dto';
import { Repository } from 'typeorm';
import { MovieCreateDTO } from './dto/movie.create.dto';
import { Movie } from './movie.entity';



@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async listAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async listUserMovies(query): Promise<Movie[]>{
    console.log(query.userId)
    console.log()
    return this.movieRepository.find({
      relations: {
          user: true,
      },
      where: {
          user: {
              id:query.userId
          },
      },
  })
}

  async addMovie(data: MovieCreateDTO):Promise<ResultsDTO>{
    let movie = new Movie()
    movie.movieName = data.movieName,
    movie.moviePoster = data.moviePoster,
    movie.movieImdb = data.movieImdb,
    movie.user = data.movieUser
    
    return this.movieRepository.save(movie)
    .then((result) => {
      return <ResultsDTO>{
        status: true,
        message:"Filme Adicionado com sucesso"
      }
    })
    .catch((error)=>{
      return <ResultsDTO>{
        status: false,
        message:"Houve um erro ao adicionar o filme na biblioteca"
      }

    })
    
  }

  async remove(movieId){
  console.log(movieId)
    return this.movieRepository.delete(movieId)
  }


  async findOne(name: string): Promise<Movie | undefined> {
    return this.movieRepository.findOneBy({movieName: name});
  }
}