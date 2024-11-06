import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDto, UpdateGenreDto } from "./dto";
import { GenreEntity } from "src/core/entity";

@Controller('/genre')
export class GenreController {
    constructor(private readonly genreService: GenreService){}
    @Post('/add')
    async create(@Body() createGenreDto: CreateGenreDto) {
        return await this.genreService.create(createGenreDto)
    }
    @Get('/all')
    async findAll() {
        return await this.genreService.findAll()
    }

    @Get('/:id')
    async findOne(@Param('id', ParseUUIDPipe) id: string){
        return await this.genreService.findOne(id)  
    }

    @Patch('/update/:id')
    async update(@Param('id',ParseUUIDPipe) id: string, @Body() updateGenreDto: UpdateGenreDto) {
        return await this.genreService.update(id, updateGenreDto)
    }
    
    @Delete('/delete/:id',)
    async remove(@Param('id',ParseUUIDPipe) id: string){
        return await this.genreService.remove(id)
    }
}