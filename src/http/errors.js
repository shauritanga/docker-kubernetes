export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details || null,
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflict',
      details: err.detail || 'Unique constraint violation',
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Invalid reference',
      details: err.detail || 'Referenced record does not exist',
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'Internal server error',
  });
}
