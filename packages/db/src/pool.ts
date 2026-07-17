import pg from 'pg';

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
