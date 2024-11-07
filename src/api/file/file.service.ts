import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from 'fs/promises';
import * as path from "path";
import { RemoveFileRequest, RemoveFileResponse, UploadFileRequest, UploadFileResponse } from './interfaces/interface';

@Injectable()
export class UploadService {
    constructor() { }

    async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
        const allowedExtensions = ['.mp4', '.MOV'];
        console.log(payload.file)
        const extName = path.extname(payload.file.originalname).toLowerCase();

        if (!allowedExtensions.includes(extName)) {
            throw new HttpException('Fayl formati noto\'g\'ri, faqat mp4 fayllar qo\'yish mumkin', HttpStatus.BAD_REQUEST);
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileName = `${payload.file.fieldname}-${uniqueSuffix}${extName}`;
        const fullFilePath = path.join(__dirname, '../../../', payload.destination, fileName);

        try {
            const destinationDir = path.join(__dirname, '../../../', payload.destination);

            try {
                await fs.access(destinationDir);
            } catch {
                await fs.mkdir(destinationDir, { recursive: true });
            }

            await fs.writeFile(fullFilePath, payload.file.buffer);

            const fileUrl = `${payload.destination}/${fileName}`;
            return {
                file: fileUrl,
                message: "Fayl muvaffaqiyatli yuklandi",
            };
        } catch (error) {
            console.log(error)
            throw new HttpException(`Fayl yuklashda xatolik: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
        // Faylning to'liq yo'lini olish
        const filePath = path.join(__dirname, '../../../', payload.fileName);

        try {
            // Fayl mavjudligini tekshirish
            await fs.access(filePath);
            // Faylni o'chirish
            await fs.unlink(filePath);

            // Muvaffaqiyatli o'chirish haqida xabar
            return {
                message: 'Fayl muvaffaqiyatli o\'chirildi',
            };
        } catch (error) {
            // O'chirishda xatolik
            throw new InternalServerErrorException(`Faylni o'chirishda xatolik: ${error.message}`);
        }
    }
}
