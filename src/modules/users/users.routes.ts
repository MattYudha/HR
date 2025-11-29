import { Router } from 'express';
import usersController from './users.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.get('/me', authMiddleware, (req, res) => usersController.getMe(req, res));

router.get('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  usersController.getAllUsers(req, res)
);

export default router;
