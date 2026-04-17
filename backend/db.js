import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.error("Postgres connection error:", err.stack);
    process.exit(1);
  });

export default pool;
