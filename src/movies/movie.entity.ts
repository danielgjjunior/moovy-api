import { Library } from 'src/library/library.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Generated, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4(); 

@Entity()
export class Movie {
  @PrimaryColumn('uuid')
  @Generated("uuid")
  id: string;

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

  
  @OneToMany(() => Library, (library) => library.movie)
  library: Library[]
}
