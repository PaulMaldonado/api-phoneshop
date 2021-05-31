import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { authToken } from '../middlewares';

const router = Router();

router.get('/dashboard', [authToken.verifyToken], UserController.dashboard);
router.post('/signup', UserController.register);
router.post('/signin', UserController.login);

export default router;