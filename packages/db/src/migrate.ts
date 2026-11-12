import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: join(__dirname, '../../../.env') });
dotenv.config({ path: join(__dirname, '../../.env') });
dotenv.config();

import { pool } from './pool.js';

const MIGRATIONS_DIR = join(__dirname, '..', 'migrations');

async function runMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id serial PRIMARY KEY,
        filename text NOT NULL UNIQUE,
        applied_at timestamptz NOT NULL DEFAULT now()
      );
    `);

    const applied = await client.query('SELECT filename FROM _migrations ORDER BY id');
    const appliedSet = new Set(applied.rows.map((r: { filename: string }) => r.filename));

    const files = await readdir(MIGRATIONS_DIR);
    const sqlFiles = files
      .filter((f) => f.endsWith('.sql'))
      .sort();

    for (const file of sqlFiles) {
      if (appliedSet.has(file)) {
        continue;
      }

      const sql = await readFile(join(MIGRATIONS_DIR, file), 'utf-8');

      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
        await client.query('COMMIT');
        console.log(`Applied migration: ${file}`);
      } catch (err) {
        await client.query('ROLLBACK');
        console.error(`Failed migration ${file}:`, err);
        throw err;
      }
    }

    console.log('All migrations applied.');
  } finally {
    client.release();
  }
}

runMigrations()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration crashed:', err);
    process.exit(1);
  });
