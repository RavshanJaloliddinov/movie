import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from 'src/core/entity';
import { Repository } from 'typeorm';
import { CreateGenreDto, UpdateGenreDto } from './dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity) private genreRepo: Repository<GenreEntity>,
  ) {}
  async create(createGenreDto: CreateGenreDto) {
    const newGenre = this.genreRepo.create({
      genre_name: createGenreDto.genre_name,
    });

    await this.genreRepo.save(newGenre);
    return newGenre;
  }

  async findAll(): Promise<GenreEntity[]> {
    return await this.genreRepo.find();
  }

  async findOne(id: string): Promise<GenreEntity | null> {
    const foundedGenre = await this.genreRepo.findOne({ where: { id } });

    if(!foundedGenre) {
        throw new NotFoundException('Genre not found')
    }
    
    return foundedGenre
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const foundedGenre = await this.genreRepo.findOne({
      where: { id },
    });

    if (!foundedGenre) {
      throw new NotFoundException('Genre Not Found');
    }
    return await this.genreRepo.update(
      { id:id },
      {
        genre_name: updateGenreDto?.genre_name,
      },
    );
  }

  async remove(id: string) {
    const foundedGenre = await this.genreRepo.findOne({
      where: { id },
    });
    if (!foundedGenre) {
      throw new NotFoundException('Genre not found');
    }
    return await this.genreRepo.delete({ id });
  }
}
