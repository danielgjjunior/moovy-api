import { EntityRepository, Repository } from 'typeorm';
import { Library } from './library.entity';

@EntityRepository(Library)
export class LibraryRepository extends Repository<Library> {}
