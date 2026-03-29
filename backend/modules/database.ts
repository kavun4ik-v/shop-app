import 'dotenv/config';
import postgres, { Sql } from 'postgres';

const { DB_USER, DB_PASSWORD, HOST, DB_PORT, DATABASE } = process.env;

if (!DB_USER || !DB_PASSWORD || !HOST || !DB_PORT || !DATABASE) {
  throw new Error('Missing required environment variables for database connection');
}

const pg: Sql<any> = postgres(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`);

export default pg;