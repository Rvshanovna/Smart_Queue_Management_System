import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  compare(password: string, password1: string) {
    throw new Error('Method not implemented.');
  }
  async decrypt(data: string) {
    return hash(data, 7);
  }

  async encrypt(data: string, hashedData: string) {
    return compare(data, hashedData);
  }
}
