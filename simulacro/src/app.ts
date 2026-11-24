import express from 'express';
import type { Application } from 'express';

import { documentsRouter } from './routes/documents.js'; // ← NUEVO
import { healthRouter } from './routes/health.js';
import { questionsRouter } from './routes/questions.js';

export function createApp(): Application {
  const app = express();

  app.use(express.json()); // antes de las rutas: si no, req.body es undefined

  app.use('/health', healthRouter);
  app.use('/api/v1/admin/documents', documentsRouter); // ← NUEVO
  app.use('/api/v1/questions', questionsRouter);
  
  return app;
}