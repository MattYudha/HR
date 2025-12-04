import { Router } from 'express';
import authController from './auth.controller';

const router = Router();

console.log('Auth routes loaded. Defining /register and /login routes.'); // Added log

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;
