import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, Generated, PrimaryColumn, ManyToOne } from 'typeorm';

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
  audioPath?: string;

  @Column({ nullable: true })
  audioName?: string;

  @ManyToOne(() => User, (user) => user.library)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.library)
  movie: Movie;
}
