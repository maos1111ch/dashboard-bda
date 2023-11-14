const { Pool } = require("pg");
require("dotenv").config();

let conn: any;

if (!conn) {
  conn = new Pool({
    connectionString:
      "postgres://:@ep-billowing-wind-02543254-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
  });
}
export { conn };
