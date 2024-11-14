import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express'
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieEntity } from 'src/core/entity/movie.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected } from 'src/common/decorator/protected.decorator';
import { Roles } from '../auth/roles/RolesDecorator';
import { UserRoles } from 'src/common/database/Enums';

@ApiTags('Movies')
// @ApiBearerAuth('auth')
@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }


  @Post('/add')
  // @Protected(true)
  // @Roles([UserRoles.ADMIN])
  // @ApiOperation({ summary: 'Create a new movie' })
  @ApiConsumes('multipart/form-data')
  // @ApiResponse({
  //   status: 201,
  //   description: 'The movie has been successfully created.',
  //   type: MovieEntity,
  // })
  @UseInterceptors(FileInterceptor('video')) 
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() video: Express.Multer.File, // Video faylni olish
  ) {
    console.log(video.filename, video.originalname)
    return await this.movieService.create({ ...createMovieDto, video });
  } 

  @Get('/all')
  // @Protected(true)
  // @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all movies.',
    type: [MovieEntity],
  })
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the movie.',
    type: MovieEntity,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.movieService.findOne(id);
  }

  @Patch('/update/:id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the movie.',
    type: MovieEntity,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the movie.' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.movieService.remove(id);
  }

  @Post(':movieId/genres/:genreId')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Add genre to a movie' })
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String })
  @ApiParam({ name: 'genreId', description: 'The ID of the genre', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully added genre to movie',
    type: MovieEntity,
  })
  async addGenreToMovie(
    @Param('movieId') movieId: string,
    @Param('genreId') genreId: string,
  ) {
    return this.movieService.addGenreToMovie(movieId, genreId);
  }

  @Delete(':movieId/genres/:genreId/delete')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Remove genre from a movie' })
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String })
  @ApiParam({ name: 'genreId', description: 'The ID of the genre', type: String })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed genre from movie',
  })
  async removeGenreFromMovie(
    @Param('movieId') movieId: string,
    @Param('genreId') genreId: string,
  ) {
    return this.movieService.removeGenreFromMovie(movieId, genreId);
  }

  @Post(':movieId/actors/:actorId')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Add actor to a movie' })
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String })
  @ApiParam({ name: 'actorId', description: 'The ID of the actor', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully added actor to movie',
    type: MovieEntity,
  })
  async addActorToMovie(
    @Param('movieId') movieId: string,
    @Param('actorId') actorId: string,
  ) {
    return this.movieService.addActorToMovie(movieId, actorId);
  }

  @Delete(':movieId/actors/:actorId/delete')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Remove actor from a movie' })
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String })
  @ApiParam({ name: 'actorId', description: 'The ID of the actor', type: String })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed actor from movie',
  })
  async removeActorFromMovie(
    @Param('movieId') movieId: string,
    @Param('actorId') actorId: string,
  ) {
    return this.movieService.removeActorFromMovie(movieId, actorId);
  }
}
