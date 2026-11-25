import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/live', (_req, res) => {
  throw new Error('Fallo interno de prueba');
  res.status(200).json({ status: 'live' });
});