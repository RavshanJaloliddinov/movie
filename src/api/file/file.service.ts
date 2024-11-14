import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { RemoveFileRequest, RemoveFileResponse, UploadFileRequest, UploadFileResponse } from './interfaces/interface';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
    try {
      // GENERATE UNIQUE FILE NAME
      const extName = path.extname(payload.file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

      // GET FILE'S FULL PATH
      const fullFilePath = path.join(
        __dirname,
        '../../../',
        payload.destination,
        fileName,
      );

      const isFileFolderExists = existsSync(
        path.join(__dirname, '../../../', payload.destination),
      );

      // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
      if (!isFileFolderExists) {
        await fs.mkdir(path.join(__dirname, '../../../', payload.destination), { recursive: true });
      }

      // WRITE FILE TO DESTINATION
      await fs.writeFile(fullFilePath, payload.file.buffer);

      // CREATE IMAGE URL
      const imageUrl = `${payload.destination}/${fileName}`;

      return {
        imageUrl,
        message: 'File written successfully',
      };
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }

  async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
    try {
      const filePath = path.join(__dirname, '../../../', payload.fileName);

      const isFileExists = existsSync(filePath);

      // REMOVE FILE IF EXISTS
      if (isFileExists) {
        await fs.unlink(filePath);
      } else {
        throw new Error('File not found');
      }

      return {
        message: 'File removed successfully',
      };
    } catch (error) {
      throw new Error('File removal failed: ' + error.message);
    }
  }
}
