import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 10);

export const generateRandomToken = (): Promise<string> =>
  new Promise((resolve) =>
    randomBytes(64, (err, buffer) => resolve(buffer.toString('base64'))),
  );
