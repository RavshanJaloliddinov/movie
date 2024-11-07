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
import { FavouriteMovieService } from './favourite_movie.service';
import { CreateFavouriteMovieDto, UpdateFavouriteMovieDto } from './dto';

  @Controller('/favourite_movie')
  export class FavouriteMovieController {
    constructor(private readonly favouriteMovieService: FavouriteMovieService) {}
  
    @Post('/add')
    async create(@Body() createFavouriteMovieDto: CreateFavouriteMovieDto) {
      return await this.favouriteMovieService.create(createFavouriteMovieDto);
    }
  
    @Get('/all')
    async findAll() {
      return await this.favouriteMovieService.findAll();
    }
  
    @Get('/:id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return await this.favouriteMovieService.findOne(id);
    }
  
    @Patch('/update/:id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateFavouriteMovieDto: UpdateFavouriteMovieDto,
    ) {
      return await this.favouriteMovieService.update(id, updateFavouriteMovieDto)
    }
  
    @Delete('/delete/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string){
      return await this.favouriteMovieService.remove(id)
    }
  }
  