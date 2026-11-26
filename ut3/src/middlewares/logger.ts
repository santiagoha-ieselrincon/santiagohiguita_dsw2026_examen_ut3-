import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export function logger(req: Request, res: Response, next: NextFunction): void {
  if (env.DEPURACION === 1) console.log('[2] logger: entrada', req.requestId);

  const start = performance.now(); // Empieza a medir lo que tarda la petición

  res.on('finish', () => {
    // Se ejecuta cuando la petición ha terminado después de pasar por todos los middlewares y handlers
    const duration = Math.round(performance.now() - start);
    const entry = {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    };
    if (env.DEPURACION === 1) console.log(JSON.stringify(entry)); // Loguea en pantalla la información de la petición
  });

  next();
}
