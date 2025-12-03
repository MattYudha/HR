import { Request, Response } from 'express';
import { getRecapData } from './payroll.recap.service';

export const getPayrollRecap = async (req: Request, res: Response) => {
  const { period } = req.query;

  if (typeof period !== 'string') {
    return res.status(400).json({ message: 'Period query parameter is required' });
  }

  try {
    const recapData = await getRecapData(period);
    res.json(recapData);
  } catch (error) {
    console.error('Error fetching payroll recap:', error);
    res.status(500).json({ message: 'Failed to fetch payroll recap data' });
  }
};