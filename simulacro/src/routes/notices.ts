
import { Router } from 'express';
import * as noticesController from '../controllers/noticesController.js';

export const noticesRouter = Router();

noticesRouter.get('/', noticesController.list);
noticesRouter.post('/', noticesController.create);
noticesRouter.get('/:noticeId', noticesController.getById);
noticesRouter.patch('/:noticeId', noticesController.update);
