import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';
import { validateUserData, validateUserUpdateData } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUserData, createUser);
router.put('/:id', validateUserUpdateData, updateUserById);
router.delete('/:id', deleteUserById);

export default router;