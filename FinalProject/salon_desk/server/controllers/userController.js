import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

// Dummy data until DB is used
export const getUsers = (req, res) => {
  res.json([{ name: 'Dhruvil' }, { name: 'Kavy' }, { name: 'Aarya' }, { name: 'Jiya' }]);
};
