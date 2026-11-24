
import { Router } from 'express';
import * as documentsController from '../controllers/documentsController.js';

export const documentsRouter = Router();

documentsRouter.get('/', documentsController.list);
documentsRouter.post('/', documentsController.create);
documentsRouter.get('/:documentId', documentsController.getById);
documentsRouter.patch('/:documentId', documentsController.update);
