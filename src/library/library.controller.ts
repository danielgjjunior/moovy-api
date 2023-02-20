import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MovieCreateDTO } from 'src/movies/dto/movie.create.dto';
import { LibraryDto } from './dto/library.dto';
import { Library } from './library.entity';
import { LibraryService } from './library.service';
import { LibraryMapper } from './mapper/library.mapper';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  async listUserMovies(@Query() query): Promise<LibraryDto[]> {
    const res = await this.libraryService.listUserMovies(query);
    const arr: LibraryDto[] = [];
    for (let i = 0; i <= res.length - 1; i++) {
      arr.push(LibraryMapper.fromEntityToDto(res[i]));
    }
    return arr;
  }

  @Post()
  async saveUserMovie(
    @Body() data: MovieCreateDTO,
    @Query() userID: { userId: string },
  ): Promise<Library> {
    return this.libraryService.saveUserMovie(data, userID);
  }

  @Delete()
  remove(@Query() query) {
    return this.libraryService.remove(query);
  }

  //audios

  @Post('audioUpload')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: '../audio_files/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16)) //sequência de caracteres aleatórios para nome do arquivo.
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addAudio(
    @Query('userId') userId: string,
    @Query('movieId') movieId: string,
    @UploadedFile() audioFile: Express.Multer.File,
  ) {
    if (!userId || !movieId) {
      throw new BadRequestException('Missing required parameters');
    }
    return this.libraryService.createAudio(userId, movieId, audioFile);
  }

  @Get('audioLoad')
  async getAudioByUserIdAndMovieId(
    @Query('userId') userId: string,
    @Query('movieId') movieId: string,
  ): Promise<LibraryDto> {
    return await this.libraryService.GetAudioByUserIdAndMovieId(
      userId,
      movieId,
    );
  }

  @Delete('audioDelete')
  async deleteAudio(@Query('audioName') audioName: string) {
    return this.libraryService.deleteAudio(audioName);
  }
}
