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
import { ActorService } from './actor.service';
import { CreateActorDto, UpdateActorDto } from './dto';

@Controller('/actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post('/add')
  async create(@Body() createActorDto: CreateActorDto) {
    return await this.actorService.create(createActorDto);
  }

  @Get('/all')
  async findAll() {
    return await this.actorService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.actorService.findOne(id);
  }

  @Patch('/update/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return await this.actorService.update(id,updateActorDto)
  }

  @Delete('/delete/:id')
  async delete(@Param('id',ParseUUIDPipe) id: string){
    return await this.actorService.remove(id);
  }
}
