import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  movieName: string;

  @Column({ length: 100 })
  moviePoster: string;

  @Column()
  movieImdb: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.movies)
  user: User;
}
