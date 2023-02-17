import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

@Entity()
export class Library {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  movieId: string;

  @Column({ nullable: true })
  review?: string;

  @ManyToOne(() => User, (user) => user.library)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.library)
  movie: Movie;
}
