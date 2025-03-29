/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from './database.service';

@Injectable()
export class StorageService {
  constructor(private readonly databaseService: DataBaseService) {}

  /**
   * The `uploadImage` function asynchronously uploads a base64 encoded image file to a specified bucket
   * in a Supabase storage service.
   * @param {string} bucketName - The `bucketName` parameter refers to the name of the storage bucket
   * where you want to upload the image file. This is typically a container for storing files in cloud
   * storage services like Supabase.
   * @param {string} fileName - The `fileName` parameter in the `uploadImage` function refers to the name
   * that you want to give to the file when uploading it to the specified `bucketName`. This could be the
   * desired name of the file in the storage system.
   * @param {string} file - The `file` parameter in the `uploadImage` function is expected to be a base64
   * encoded string representing an image file.
   * @returns The `uploadImage` function returns a Promise that resolves to the data object returned by
   * the Supabase storage upload operation.
   */
  async uploadImage(
    bucketName: string,
    fileName: string,
    file: string /** base64 */,
  ) {

    console.log('converting base64 to buffer');
    const blob: Blob = await this.convertBase64ToFile(file, fileName);

    console.log('converted base64 to blob', blob);

    return await this.databaseService.supabase.storage
      .from(bucketName)
      .upload(fileName, blob)
      .then((res) => {
        if(res.error) {
          console.log(res.error);
          
          throw new Error(JSON.stringify(res.error))};
        
        
        return res.data}).catch((err) => {

        throw new Error(JSON.stringify(err));
      });
  }

  async convertBase64ToBuffer(base64: string) {
    return await Buffer.from(base64, 'base64');
  }

  async convertBase64ToFile(base64: string, filePath: string): Promise<File> {
    const fileExtension = base64.split(';').shift()?.split('/').pop();
    if (!fileExtension) {
      throw new Error('Extensão do arquivo vazia');
    }

    const base64Data = base64.split(',').pop();
    if (!base64Data) {
      throw new Error('Invalid base64 string');
    }
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/' + fileExtension });

    if (!blob) {
      throw new Error('Erro ao converter base64 para Blob');
    }
    const file = new File([blob], filePath, { type: 'image/' + fileExtension });
    if (!file) {
      throw new Error('Erro ao converter Blob para File');
    }
    return file;
  }


  async getFileFromBucket(bucketName: string, path: string) {
    return await this.databaseService.supabase.storage
      .from(bucketName)
      .list(path);
  }

  async deleteFileFromBucket(bucketName: string, path: string) {
    return await this.databaseService.supabase.storage
      .from(bucketName)
      .remove([path]);
  }

}
