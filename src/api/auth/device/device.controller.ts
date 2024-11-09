import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DeviceService } from './device.service';

@ApiTags('Devices') // Kategoriya nomi
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  // Barcha qurilmalarni olish
  @Get()
  @ApiOperation({ summary: 'Barcha qurilmalarni olish' })
  async getAllDevices() {
    return await this.deviceService.getAllDevices();
  }

  // Foydalanuvchi ID bo'yicha qurilmalarni olish
  @Get(':userId')
  @ApiOperation({ summary: 'Foydalanuvchi ID bo\'yicha qurilmalarni olish' })
  @ApiParam({ name: 'userId', description: 'Foydalanuvchi ID', example: '12345' })
  async getDevicesByUserId(@Param('userId') userId: string) {
    return await this.deviceService.getDevicesByUserId(userId);
  }

  // Foydalanuvchi ID va qurilma ID bo'yicha qurilmani olish
  @Get(':userId/:deviceId')
  @ApiOperation({ summary: 'Foydalanuvchi ID va qurilma ID bo\'yicha qurilmani olish' })
  @ApiParam({ name: 'userId', description: 'Foydalanuvchi ID', example: '12345' })
  @ApiParam({ name: 'deviceId', description: 'Qurilma ID', example: '67890' })
  async getDeviceByUserIdAndDeviceId(@Param('userId') userId: string, @Param('deviceId') deviceId: string) {
    return await this.deviceService.getDeviceByUserIdAndDeviceId(userId, deviceId);
  }
}
