import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const isProduction = env.NODE_ENV === 'production';

  console.error(
    JSON.stringify({
      requestId: req.requestId,
      error: err.message,
      stack: isProduction ? undefined : err.stack,
    }),
  );

  // Errores esperados: los lanza nuestro código a propósito (400, 404...).
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.code ?? 'ERROR', message: err.message });
    return;
  }

  // Error de recurso no encontrado: lanzado a propósito (404).
  if (err instanceof ResourceNotFoundError) {
    res.status(err.statusCode).json({ error: err.code ?? 'ERROR', message: err.message, resourceId: err.resourceId });
    return;
  }

  // express.json() lanza un SyntaxError si el body no es JSON válido:
  // es culpa del cliente, así que es un 400, no un 500.
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'INVALID_JSON', message: 'Request body is not valid JSON' });
    return;
  }

  // Cualquier otra cosa es inesperada: 500, sin detalles internos en producción.
  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: isProduction ? 'An unexpected error occurred' : err.message,
  });
}