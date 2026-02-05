import express from 'express';
import {create, getAll, getUserById, updateUser, deleteUser} from '../controller/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/create', create);
router.get('/getAll', getAll);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;