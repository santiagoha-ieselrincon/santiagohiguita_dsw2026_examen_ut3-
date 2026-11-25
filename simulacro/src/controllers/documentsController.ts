
import type { Request, Response, NextFunction } from 'express';
import * as documentsService from '../services/documentsService.js';
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

    res.json(documentsService.list(page, limit));
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const document = documentsService.getById(String(req.params.documentId));

    if (!document) {
      throw new ResourceNotFoundError(404, 'NOT_FOUND', String(req.params.documentId), 'RESOURCE_NOT_FOUND');
    }

    res.json({ data: document });
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
      throw new AppError(400, 'INVALID_DOCUMENT', 'BAD_REQUEST');
    }

    const document = documentsService.create(
      title.trim(),
      description?.trim() ?? '',
    );

    res.status(201).json({ data: document });
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const { title, description } = req.body ?? {};

    if (
      (title !== undefined &&
        (typeof title !== 'string' || title.trim().length === 0)) ||
      (description !== undefined && typeof description !== 'string')
    ) {
      throw new AppError(400, 'INVALID_DOCUMENT', 'BAD_REQUEST');
    }

    const document = documentsService.update(
      String(req.params.documentId),
      { title, description },
    );

    if (!document) {
      throw new AppError(404, 'NOT_FOUND', 'NOT_FOUND');
    }

    res.json({ data: document });
  } catch (err) {
    next(err);
  }
}
