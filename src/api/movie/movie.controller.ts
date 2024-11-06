import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/add')
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Get('/all')
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.movieService.findOne(id);
  }

  @Patch('/update/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.movieService.remove(id);
  }
}
