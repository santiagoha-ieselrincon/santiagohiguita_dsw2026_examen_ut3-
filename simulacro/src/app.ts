import express from 'express';
import type { Application } from 'express';

import { documentsRouter } from './routes/documents.js'; // ← NUEVO
import { healthRouter } from './routes/health.js';
import { questionsRouter } from './routes/questions.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestId } from './middlewares/requestId.js';
import { logger } from './middlewares/logger.js';
import { noticesRouter } from './routes/notices.js';

export function createApp(): Application {
  const app = express();

  app.use(requestId);
  app.use(logger);

  app.use(express.json()); // antes de las rutas: si no, req.body es undefined

  app.use('/health', healthRouter);
  app.use('/api/v1/admin/documents', documentsRouter); 
  app.use('/api/v1/questions', questionsRouter);
  app.use('/api/v1/notices', noticesRouter);

  app.use(notFound); // ← NUEVO
  app.use(errorHandler); // ← NUEVO

  return app;
}