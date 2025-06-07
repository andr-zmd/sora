import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes Imports
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/task", taskRoutes);

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});