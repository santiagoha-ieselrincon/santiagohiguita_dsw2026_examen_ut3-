import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export function requestId(req: Request, _res: Response, next: NextFunction): void {
  req.requestId = randomUUID();
  if (env.DEPURACION === 1) console.log('[1] requestId', req.requestId);
  next();
}
