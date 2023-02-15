import { Entity, Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4(); 


@Entity()
export class Token {
  @PrimaryColumn({type:uuid})
  @Generated("uuid")
  id: string;

  @Column({ length: 5000 })
  hash: string;

  @Column({ length: 100 })
  username: string;
}
