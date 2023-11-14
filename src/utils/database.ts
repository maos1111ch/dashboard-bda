import { Pool } from "pg";

new Pool({
  user: "postgres",
  password: "secretPass",
  host: "localhost",
  port: 5432,
  database,
});
