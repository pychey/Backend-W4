import { users, addUser, updateUser, deleteUser, findUserById } from '../models/userModel.js';

// GET /users - List all users
export const getAllUsers = (req, res) => {
    res.json(users);
};

// GET /users/:id - Get one user
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

// POST /users - Create new user
export const createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = addUser(name, email);
    res.status(201).json(newUser);
};

// PUT /users/:id - Update user
export const updateUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    // Validation is now handled by middleware
    const updatedUser = updateUser(userId, { name, email });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
};

// DELETE /users/:id - Delete user
export const deleteUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const success = deleteUser(userId);
    if (!success) return res.status(404).json({ error: 'User not found' });

    res.status(204).send();
};