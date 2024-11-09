import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as useragent from 'express-useragent';
import { DeviceEntity } from 'src/core/entity/device.entity';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(DeviceEntity)
        private readonly deviceRepository: Repository<DeviceEntity>,
    ) { }

    async saveDeviceInfo(userId: string, userAgent: string) {
        const source = useragent.parse(userAgent);  // `useragent` to‘g‘ri ishlatilmoqda

        const device = this.deviceRepository.create({
            userId,
            deviceType: source.platform,
            os: source.os,
            browser: source.browser,
            version: source.version,
            lastUsed: new Date(),
        });

        await this.deviceRepository.save(device);
        return device;
    }

    async getAllDevices() {
        return await this.deviceRepository.find()
    }

    async getDevicesByUserId(userId: string) {
        return await this.deviceRepository.find({ where: { userId } })
    }

    async getDeviceByUserIdAndDeviceId(userId: string, deviceId: string) {
        return await this.deviceRepository.find({
            where: { userId, id: deviceId }
        })
    }
}
