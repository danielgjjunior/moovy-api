import { LibraryDto } from '../dto/library.dto';
import { Library } from '../library.entity';

export class LibraryMapper {
  static fromEntityToDto(entity: Library): LibraryDto {
    const dto = new LibraryDto();

    dto.id = entity.id;
    dto.movie_id = entity.movieId;
    dto.user_id = entity.userId;
    dto.review = entity.review;

    return dto;
  }
}
