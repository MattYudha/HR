import { Router } from 'express';
import employeesController from './employees.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.get('/me', authMiddleware, (req, res) =>
  employeesController.getMyProfile(req, res)
);

router.get('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  employeesController.getAllEmployees(req, res)
);

router.post('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  employeesController.createEmployee(req, res)
);

export default router;
