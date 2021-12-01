import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
  UploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: Storage
  ) { }

  toDataURL(file: File, callback: (result: string) => void): void {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result as string);
    }
  }

  uploadImage(folder: string, file: File, name?: string): Promise<string> {
      const path = `${folder}/${Date.now()}_${!name ? file.name : name}`;
      const reference = ref(this.storage, path);
      return uploadBytesResumable(reference, file)
        .then(data => getDownloadURL(data.ref)) as Promise<string>;
  }
}
