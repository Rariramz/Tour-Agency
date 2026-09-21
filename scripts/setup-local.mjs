import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const target = new URL('../backend/.env', import.meta.url);
const content = [
  'NODE_ENV=development',
  'PORT=5000',
  'DB_HOST=127.0.0.1',
  'DB_PORT=55432',
  'DB_USER=tour_agency',
  'DB_NAME=tour_agency',
  `DB_PASSWORD=${randomBytes(32).toString('hex')}`,
  `JWT_SECRET=${randomBytes(48).toString('hex')}`,
  '',
].join('\n');

try {
  writeFileSync(target, content, { flag: 'wx', mode: 0o600 });
  console.log('Created backend/.env with fresh local credentials. Existing databases were not changed.');
} catch (error) {
  if (error.code === 'EEXIST') {
    console.log('backend/.env already exists; preserved without changes.');
  } else {
    throw error;
  }
}
