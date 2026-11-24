
import type { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService.js';
import { AppError } from '../errors/AppError.js';

export function ask(req: Request, res: Response, next: NextFunction): void {
  try {
    const { question } = req.body ?? {};

    if (typeof question !== 'string' || question.trim().length === 0) {
      throw new AppError(400, 'INVALID_QUESTION', 'BAD_REQUEST');
    }

    const answer = questionsService.answerQuestion();

    res.status(200).json({ data: answer });
  } catch (err) {
    next(err);
  }
}
