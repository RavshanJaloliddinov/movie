import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/core/entity';
import { ActorRepository } from 'src/core/repository';
import { CreateActorDto, UpdateActorDto } from './dto';

@Injectable()
export class ActorService {
  constructor(@InjectRepository(Actor) private actorRepo: ActorRepository) {}

  async create(createActorDto: CreateActorDto) {
    const newActor = this.actorRepo.create({
      name: createActorDto.name,
      biography: createActorDto.biography,
    });

    await this.actorRepo.save(newActor);
    return newActor;
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorRepo.find();
  }

  async findOne(id: string): Promise<Actor | null> {
    const foundedActor = this.actorRepo.findOne({ where: { id } });

    if (!foundedActor) {
      throw new NotFoundException('Actor not found');
    }
    return foundedActor;
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    const foundedActor = this.findOne(id);

    if (!foundedActor) {
      throw new NotFoundException('Actor not found');
    }

    return await this.actorRepo.update(
      { id: id },
      {
        name: updateActorDto.name,
        biography: updateActorDto.biography,
      },
    );
  }

  async remove(id: string) {
    const foundedActor = this.findOne(id)

    if(!foundedActor){
        throw new NotFoundException('Actor not found')
    }
    return await this.actorRepo.delete({id})
  }
}
