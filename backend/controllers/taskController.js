import taskDb from '../models/taskModel.js'
    
export function addTask(req, res) {
  const {userId, title, date, desc} = req.body;

  const sql = 'INSERT INTO task (user_id, title, description, date) VALUES (? , ?, ?, ?)';
  const values = [userId, title, desc, date];

  taskDb.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert task' });
    }
    else {
      res.status(201).json({ message: 'Task added succesfully', id: result.insertId })
    }
  })
}

export function getTask(req, res) {
  const user_id = req.query.userId;
  const sql = 'SELECT * FROM task WHERE user_id = ?';

  taskDb.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tasks'});
    }
    else {
      res.json(result);
    }
  })
}

export function updateTask(req, res) {
  const {taskId, title, date, description} = req.body;
  const values = [title, description, date, taskId];
  const sql = 'UPDATE task SET title = ?, description = ?, date = ? WHERE id = ?';

  taskDb.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update task' });
    }
    else {
      res.status(200).json({ message: 'Task updated succesfully', id: result.insertId })
    }
  })
}

export function deleteTask(req, res) {
  const id = req.params.id;
  const sql = 'DELETE FROM TASK WHERE ID = ?';
  taskDb.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete task'});
    }
  })
}
