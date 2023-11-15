import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config();

let conn: Pool | undefined = undefined;

if (!conn) {
  conn = new Pool({
    connectionString:
      process.env.POSTGRES_URL + "?sslmode=require",
  });
}

const connection = conn!
export { connection };
