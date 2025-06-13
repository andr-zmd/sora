import soraDb from "./../config/soraDb.js";

export async function queryGetTask(userId) {
  const[rows, fields] = await soraDb.execute("SELECT * FROM TASK WHERE user_id = ?", [userId]);
  return rows;
}

export async function queryAddTask(userId, title, description, date) {
  const[rows, fields] = await soraDb.execute("INSERT INTO task (user_id, title, description, date) VALUES (?, ?, ?, ?)", [userId, title, description, date]);
} 
    
export async function queryDeleteTask(userId, taskId) {
  const[rows, fields] = await soraDb.execute("DELETE FROM task WHERE user_id = ? AND id = ?", [userId, taskId])
}

export async function queryUpdateTask(userId, taskId, title, description, date) {
  const[rows, fields] = await soraDb.execute("UPDATE task SET title = ?, description = ?, date = ? WHERE id = ?", [title, description, date, taskId]);
}