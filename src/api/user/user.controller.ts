import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/core/entity/user.entity';

@Controller('users') // Foydalanuvchilarga oid API yo'li
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Foydalanuvchini yaratish
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  // Barcha foydalanuvchilarni olish
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  // Foydalanuvchini ID bo'yicha olish
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  // Foydalanuvchini yangilash
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  // Foydalanuvchini o'chirish
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
