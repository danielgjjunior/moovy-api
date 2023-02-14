import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  year: Date;

  @Column({length: 100 })
  genre: string;

  @Column({length: 100 } )
  director: string;

  @Column({length: 100 } )
  writer:string;
  
  @Column({length: 100 })
  imdbRating: string;

  @Column({length: 100 })
  imdbID:string;

  @Column({length: 100 })
  posterUrl: string;
}
