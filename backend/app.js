import express from "express";
import path from "path";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import { fileURLToPath } from "url";

import soraDb from "./config/soraDb.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Sessions 
const MySQLStore = expressMySqlSession(session);
const sessionStore = new MySQLStore({}, soraDb);

app.use(
  session({
    secret: process.env.SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60 * 1000 * 1000},
    credentials: "include",
  })
);

// API Routes
app.use("/api/task", taskRoutes);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve Frontend
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(3000, () => {
  console.log("Listening on port " + 3000);
});
