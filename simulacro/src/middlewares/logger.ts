import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export function logger(req: Request, res: Response, next: NextFunction): void {
  if (env.LOG === 'ON') {
    const start = Date.now();

    res.on('finish', () => {
      const durationMs = Date.now() - start;

      console.log(
        JSON.stringify({
          requestId: req.requestId,
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          durationMs,
          timestamp: new Date().toISOString(),
        }),
      );
    });
  }
  next();
}
