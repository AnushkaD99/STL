import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, {
    expiresIn: '1h' // Token expiration time
  });
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists in the database
    const existingUsername = await User.findOne({ where: { username: username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Signup successful. Please log in.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try { 
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({ message: 'Login successful' });
    console.log("Login successful");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: error.message });
  }
};
