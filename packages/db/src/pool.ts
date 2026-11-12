import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import dotenv from 'dotenv';
import pg from 'pg';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: join(__dirname, '../../../.env'), quiet: true });
dotenv.config({ path: join(__dirname, '../../.env'), quiet: true });
dotenv.config({ quiet: true });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
  min: 2,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export { pool };
