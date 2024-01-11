import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    database: process.env.DB_DATABASE,
});
