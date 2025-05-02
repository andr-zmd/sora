import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import taskRoutes from './routes/taskRoutes';

const app = express();

// Serve React App
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index'));
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

// Routes
app.use(express.json());
app.use('/tasks', taskRoutes)


