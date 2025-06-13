import soraDb from "../config/soraDb.js";

export async function queryUserByEmail(email) {
  const [rows] = await soraDb.execute("SELECT * FROM users WHERE email = ?", [email]);
  console.log(rows);
  return rows;
}

export async function queryAddUser(username, email, hashedPassword) {
  const[rows] = await soraDb.execute("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword]);
  return rows;
}