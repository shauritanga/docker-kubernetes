import express from 'express';
import { pool } from './db/pool.js';
import { errorHandler } from './http/errors.js';
import { createResourceRouter } from './http/resources.js';

function requestLogger(req, res, next) {
  const startedAt = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    console.log(
      JSON.stringify({
        message: 'request.completed',
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs,
      })
    );
  });
  next();
}

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.get('/', (req, res) => {
    res.json({
      service: 'claims-api',
      resources: ['members', 'hospitals', 'claims'],
    });
  });

  app.get('/health/live', (req, res) => {
    res.json({ status: 'ok' });
  });

  

  app.get('/health/ready', async (req, res) => {
    await pool.query('SELECT 1');
    res.json({ status: 'ready' });
  });

  app.use('/api/members', createResourceRouter(express, 'members'));
  app.use('/api/hospitals', createResourceRouter(express, 'hospitals'));
  app.use('/api/claims', createResourceRouter(express, 'claims'));

  app.use(errorHandler);

  return app;
}
