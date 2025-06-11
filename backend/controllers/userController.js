import { queryUser } from "../models/userModel.js";

export function register(req, res) {
  const { username, password } = req.body;

  const rows = queryUser(username);

  if (rows.length === 0) {
    res.status(401).json({message: "Invalid account or password"});
  }

  const user = rows[0];
}

export function login(req, res) {

}
