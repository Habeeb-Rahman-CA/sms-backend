import { promisify } from 'util';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';

const scryptAsync = promisify(scrypt);

export class CryptoHelper {
  /**
   * Hashes a plain-text password using NodeJS's built-in scrypt algorithm.
   * Returns a salt:hash string.
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  /**
   * Compares a plain-text password with a previously generated salt:hash.
   */
  static async comparePassword(password: string, storedHash: string): Promise<boolean> {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    const keyBuffer = Buffer.from(key, 'hex');
    return timingSafeEqual(derivedKey, keyBuffer);
  }
}
