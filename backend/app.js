import express from "express";
import path from "path";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/taskRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Sessions 
const MySQLStore = expressMySqlSession(session);

const sessionStore = new MySQLStore({
  host: "localhost",
  user: process.env.SORA_USER_DB,
  password: process.env.SORA_PASS_DB,
  database: "sora_app_db",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// API Routes
app.use("/task", taskRoutes);

// Serve Frontend
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(3000, () => {
  console.log("Listening on port " + 3000);
});
