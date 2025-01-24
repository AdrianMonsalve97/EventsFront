import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  // Clave secreta para encriptar
  private SECRET_KEY = environment.ssKey;

  constructor() {}

  // Método para encriptar texto
  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.SECRET_KEY).toString();
  }

  // Método para desencriptar texto (si es necesario en algún punto)
  decrypt(encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
