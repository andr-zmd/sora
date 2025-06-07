import soraDb from "./../config/soraDb.js";

export async function queryGetTask(userId) {
  try {
    const[rows, fields] = await soraDb.query("SELECT * FROM TASK WHERE user_id = ?", [userId])
    return rows;
  } catch (err) {
    console.log("Error fetching task");
    return [];
  }
}