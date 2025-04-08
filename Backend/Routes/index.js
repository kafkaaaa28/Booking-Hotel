import express from 'express';
import { getUsers, Register, Login, Logout } from '../Controller/Users.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../Controller/RefreshToken.js';
const router = express.Router();
router.get('/users', VerifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
