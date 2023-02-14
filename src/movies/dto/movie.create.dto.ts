import { User } from 'src/user/user.entity';

export interface MovieCreateDTO {
  movieName: string;
  moviePoster: string;
  movieImdb: string;
  movieUser: User;
  userId: number;

  /*
    if the parameter will be optional, we can put a '?' before the ':'
    */
}
