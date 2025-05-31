import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const taskDb = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "sora_app_db"
});

taskDb.connect(function(err) {
  if (err) {
    console.log("Error connecting to MySQL: ", err);
  }
  else {
    console.log("Connection Successful");
  }
});

export default taskDb;