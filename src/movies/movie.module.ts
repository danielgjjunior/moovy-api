import { forwardRef, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService, TypeOrmModule.forFeature([MovieRepository])],
})
export class MovieModule {}
