import 'dotenv/config';
import { Pool } from 'pg';

async function main() {
  console.log('DATABASE_URL =', process.env.DATABASE_URL);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const res = await pool.query('select now()');
    console.log('Connected OK, now() =', res.rows[0]);
  } catch (err) {
    console.error('DB ERROR:', err);
  } finally {
    await pool.end();
  }
}

main();
