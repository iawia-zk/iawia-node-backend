import crypto from 'crypto';
import {
  TEncrypted,
  TTransactionDataEncrypted,
} from '../../controllers/verification/verificationController.types';

export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly salt = 'salt';
  private readonly iterations = 5000;
  private readonly keyLength = 32;

  private async deriveKey(password: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        this.salt,
        this.iterations,
        this.keyLength,
        'sha256',
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey);
        }
      );
    });
  }

  private hexToBytes(hex: string): Buffer {
    return Buffer.from(hex, 'hex');
  }

  private base64ToBytes(base64: string): Buffer {
    return Buffer.from(base64, 'base64');
  }

  private async decryptField(encryptedField: TEncrypted): Promise<string> {
    try {
      const key = await this.deriveKey(process.env.PASSPORT_ENCRYPTION_KEY || '');
      const iv = this.hexToBytes(encryptedField.iv);
      const cipherText = this.base64ToBytes(encryptedField.cipher);

      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
      let decrypted = decipher.update(cipherText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }

  public async decryptData(encryptedData: TTransactionDataEncrypted): Promise<{
    nationality: string;
    dateOfBirth: string;
    dateOfExpiry: string;
    documentNumber: string;
    issuingCountry: string;
  }> {
    if (!process.env.PASSPORT_ENCRYPTION_KEY) {
      throw new Error('PASSPORT_ENCRYPTION_KEY is not defined in environment variables');
    }

    return {
      nationality: await this.decryptField(encryptedData.nationality),
      dateOfBirth: await this.decryptField(encryptedData.dateOfBirth),
      dateOfExpiry: await this.decryptField(encryptedData.dateOfExpiry),
      documentNumber: await this.decryptField(encryptedData.documentNumber),
      issuingCountry: await this.decryptField(encryptedData.issuingCountry),
    };
  }
}
