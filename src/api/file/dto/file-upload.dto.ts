import { IsNotEmpty, IsString } from "class-validator";

// UploadFileRequest interfeysidan "file" maydonini chiqaramiz
export class UploadFileDto {
    @IsString()
    @IsNotEmpty()
    destination: string;

    // Qo'shimcha maydonlarni qo'shishingiz mumkin
    @IsNotEmpty()
    file: Express.Multer.File; // Multer orqali yuklangan fayl turini belgilash
}
