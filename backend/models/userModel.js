import soraDb from "../config/soraDb.js";

export async function queryUser(username, password) {
  const [rows, fields] = await soraDb.execute('SELECT * FROM users WHERE username = ?', [username])

  return rows;
}