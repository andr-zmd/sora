import bcrypt from "bcrypt";

import soraDb from "../config/soraDb.js";
import { queryUserByEmail, queryAddUser } from "../models/userModel.js";

const saltRound = 10;

export async function register(req, res) {
  const { username, email, password } = req.body;

  // Check if user already exists
  const users = await queryUserByEmail(email);
  if (users.length !== 0) {
    return res.status(409).send("User is already registered");
  }

  // Add to db
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    await queryAddUser(username, email, hashedPassword);
    return res.status(201).send("Registration successfull");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }

}

export async function login(req, res) {
  const { email, password } = req.body;

  const row = await queryUserByEmail(email);

  if (row.length === 0) {
    return res.status(404).send("User is not registered");
  }

  const { id, password_hash } = row[0];
  
  const isPasswordMatching = await bcrypt.compare(password, password_hash);

  if (!isPasswordMatching) {
    res.status(401).send("Incorrect password");
  }

  req.session.userId = id;
  return res.status(200).send("Login Success");
}
