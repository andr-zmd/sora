import mysql from "mysql2/promise";
import "dotenv/config";

const soraDb = mysql.createPool({
  host: "localhost",
  user: process.env.SORA_USER_DB,
  password: process.env.SORA_PASS_DB,
  database: "sora_app_db",
});

export default soraDb;