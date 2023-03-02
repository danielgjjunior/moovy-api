import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { MovieCreateDTO } from 'src/movies/dto/movie.create.dto';
import { MovieService } from 'src/movies/movie.service';

import { Library } from './library.entity';
import { LibraryDto } from './dto/library.dto';
import { LibraryMapper } from './mapper/library.mapper';
import { unlink } from 'fs/promises';
import { Movie } from 'src/movies/movie.entity';
import { MovieRepository } from 'src/movies/movie.repository';
import { LibraryRepository } from './library.repository';

interface MovieWithAudio {
  movie: Movie;
  audioPath: string | null;
  audioName: string | null;
}

@Injectable()
export class LibraryService {
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly movieService: MovieService,
    private readonly movieRepository: MovieRepository,
  ) {}

  async listUserMovies(query): Promise<Library[]> {
    return this.libraryRepository.find({
      userId: query.userId,
    });
  }

  async getUserMovies(userId: string): Promise<any[] | void> {
    const userLibraries = await this.listUserMovies({ userId });

    const userMovies = await Promise.all(
      userLibraries.map(async (userLibrary) => {
        const movie = await this.movieRepository.findOne({
          id: userLibrary.movieId,
        });
        const movieWithAudio: MovieWithAudio = {
          movie: movie,
          audioPath: userLibrary.audioPath,
          audioName: userLibrary.audioName,
        };
        return movieWithAudio;
      }),
    );
    return userMovies;
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

  async createAudio(
    userId: string,
    movieId: string,
    audioFile?: Express.Multer.File,
  ): Promise<LibraryDto> {
    const existingLibrary = await this.libraryRepository.findOne({
      where: { userId, movieId },
    });

    if (existingLibrary) {
      if (audioFile) {
        if (existingLibrary.audioName) {
          await unlink(existingLibrary.audioPath);
        }

        existingLibrary.audioPath = audioFile.path;
        existingLibrary.audioName = audioFile.filename;
      }

      await this.libraryRepository.update(existingLibrary.id, {
        audioPath: existingLibrary.audioPath,
        audioName: existingLibrary.audioName,
      });
      return LibraryMapper.fromEntityToDto(existingLibrary);
    } else {
      const newLibrary = new Library();
      newLibrary.userId = userId;
      newLibrary.movieId = movieId;

      if (audioFile) {
        newLibrary.audioPath = audioFile.path;
        newLibrary.audioName = audioFile.filename;
      }

      const savedLibrary = await this.libraryRepository.save(newLibrary);
      return LibraryMapper.fromEntityToDto(savedLibrary);
    }
  }

  async deleteAudio(audioName: string) {
    const library = await this.libraryRepository.findOne({ audioName });
    if (!library) {
      throw new NotFoundException('Audio not found');
    }

    await unlink(library.audioPath + library.audioName);

    return await this.libraryRepository.update(library.id, {
      audioPath: null,
      audioName: null,
    });
  }
  async GetAudioByUserIdAndMovieId(
    userId: string,
    movieId: string,
  ): Promise<LibraryDto | undefined> {
    const entity = await this.libraryRepository.findOne({
      where: {
        userId,
        movieId,
      },
    });

    if (!entity) {
      return undefined;
    }

    return LibraryMapper.fromEntityToDto(entity);
  }
}
