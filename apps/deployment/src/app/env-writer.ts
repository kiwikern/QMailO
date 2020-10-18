import { promises as fs } from 'fs';
import { join } from 'path';

interface Env {
  QMAILO_PATH: string;
  PASSWORD_HASH: string;
  PORT: number;
  JWT_SECRET: string;
}

export const writeEnv = async (env: Env): Promise<void> => {
  const content = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const path = join(__dirname, '../../../apps/api', '.env');
  await fs.writeFile(path, content);
};
