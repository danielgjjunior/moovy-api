import { UserReturnDTO } from '../dto/user.return.dto';
import { User } from '../user.entity';

export class UserMapper {
  static fromEntityToDto(entity: User): UserReturnDTO {
    const dto = new UserReturnDTO();

    dto.email = entity.email;
    dto.name = entity.name;

    return dto;
  }
}
