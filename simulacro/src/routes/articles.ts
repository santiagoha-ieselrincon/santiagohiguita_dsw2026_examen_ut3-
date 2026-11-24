import { Router } from 'express';
import * as articlesController from '../controllers/articlesController.js';

export const articlesRouter = Router();

articlesRouter.get('/', articlesController.list);
articlesRouter.post('/', articlesController.create);
articlesRouter.get('/:articleId', articlesController.getById);
articlesRouter.patch('/:articleId', articlesController.update);