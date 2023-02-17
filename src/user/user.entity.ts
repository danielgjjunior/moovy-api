import { Library } from 'src/library/library.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Generated } from 'typeorm/decorator/Generated';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

@Entity()
export class User {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Library, (library) => library.user)
  library: Library[];
}
