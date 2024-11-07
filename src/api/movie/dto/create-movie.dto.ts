import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
    required: false,  
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Video file of the movie',
    type: 'string',
    format: 'binary', 
    example: 'movie.mp4',
    required: false, 
  })
  @IsNotEmpty()
  video: Express.Multer.File;

  @ApiProperty({
    description: 'Rating of the movie',
    example: 8.8,
    required: false,  
  })
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'Release date of the movie',
    example: '2010-07-16T00:00:00.000Z', 
    required: false, 
  })
  @IsDate()
  @IsOptional()
  release_date: Date;

  @ApiProperty({
    description: 'Is the movie a premium movie?',
    example: true,
    required: false, 
  })
  @IsBoolean()
  @IsOptional()
  is_premium: boolean;

  @ApiProperty({
    description: 'Description of the movie',
    example: 'A skilled thief is given a chance at redemption if he can successfully perform an inception: planting an idea into a target\'s subconscious.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
