import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5000 })
  hash: string;

  @Column({ length: 100 })
  username: string;
}
