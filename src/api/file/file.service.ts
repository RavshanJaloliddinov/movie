import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';
import * as path from "path";
import {
    RemoveFileRequest,
    RemoveFileResponse,
    UploadFileRequest,
    UploadFileResponse
} from './interfaces/interface'

@Injectable()
export class UploadService {
    constructor() { }

    async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
        // Fayl uchun ruxsat etilgan kengaytma ro'yxati
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4'];
        const extName = path.extname(payload.file.originalname).toLowerCase();

        // Fayl kengaytmasini tekshirish
        if (!allowedExtensions.includes(extName)) {
            throw new Error('Fayl formati noto\'g\'ri');
        }

        // Fayl nomini yaratish: noyob suffix qo'shamiz
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileName = `${payload.file.fieldname}-${uniqueSuffix}${extName}`;
        const fullFilePath = path.join(__dirname, '../../../', payload.destination, fileName);

        try {
            // Fayl joylashuvi uchun kerakli papka mavjudligini tekshirish
            try {
                await fs.access(path.join(__dirname, '../../../', payload.destination));
            } catch {
                // Agar papka mavjud bo'lmasa, uni yaratish
                await fs.mkdir(path.join(__dirname, '../../../', payload.destination), { recursive: true });
            }

            // Faylni yozish
            await fs.writeFile(fullFilePath, payload.file.buffer);

            // Muvaffaqiyatli yuklangan fayl URL'ini qaytarish
            const fileUrl = `${payload.destination}/${fileName}`;
            return {
                file: fileUrl,
                message: "Fayl muvaffaqiyatli yozildi"
            };
        } catch (error) {
            // Yuklash jarayonida yuzaga kelgan xatolikni qaytarish
            throw new Error(`Fayl yuklashda xatolik: ${error.message}`);
        }
    }

    async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
        // O'chirilishi kerak bo'lgan fayl yo'lini belgilash
        const filePath = path.join(__dirname, '../../../', payload.fileName);

        try {
            // Faylning mavjudligini tekshirish
            await fs.access(filePath);
            // Faylni o'chirish
            await fs.unlink(filePath);

            // Muvaffaqiyatli o'chirilgan fayl haqida xabar qaytarish
            return {
                message: 'Fayl muvaffaqiyatli o\'chirildi',
            };
        } catch (error) {
            // O'chirish jarayonida yuzaga kelgan xatolikni qaytarish
            throw new Error(`Faylni o'chirishda xatolik: ${error.message}`);
        }
    }
}
