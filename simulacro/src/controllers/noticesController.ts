
import type { Request, Response, NextFunction } from 'express';
import * as noticesService from '../services/noticesService.js';
import { AppError } from '../errors/AppError.js';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';

export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1
    ) {
      //throw new AppError(400, 'INVALID_PAGINATION', 'BAD_REQUEST');
      throw new Error('boom');
    }

    res.json(noticesService.list(page, limit));
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const notice = noticesService.getById(String(req.params.noticeId));

    if (!notice) {
      throw new ResourceNotFoundError(404, 'NOT_FOUND', String(req.params.noticeId), 'RESOURCE_NOT_FOUND');
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { title, description } = req.body;

    if (
      typeof title !== 'string' ||
      title.trim().length === 0 ||
      (description !== undefined && typeof description !== 'string')
    ) {
      throw new AppError(400, 'INVALID_NOTICE', 'BAD_REQUEST');
    }

    const notice = noticesService.create(
      title.trim(),
      description?.trim() ?? '',
    );

    res.status(201).json({ data: notice });
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const { title, description } = req.body ?? {};

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      res.status(400).json({error: 'INVALID_TITLE', message: 'Title must be a non-empty string'});
      return;
    }

    const notice = noticesService.update(
      String(req.params.noticeId),
      { title, description },
    );

    if (!notice) {
      throw new AppError(404, 'NOT_FOUND', 'NOT_FOUND');
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}
