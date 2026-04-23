import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
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
