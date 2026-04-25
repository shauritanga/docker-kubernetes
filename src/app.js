import express from 'express';
import pg from 'pg';
import { config } from './config.js';

const { Pool } = pg;

const pool = new Pool({
  host: config.databaseHost,
  port: config.databasePort,
  database: config.databaseName,
  user: config.databaseUser,
  password: config.databasePassword,
  connectionTimeoutMillis: 1500,
});

export function createApp() {
  const app = express();

  app.get('/healthz', (request, response) => {
    response.json({ status: 'ok' });
  });

  app.get('/readyz', (request, response) => {
    response.json({
      status: 'ready',
      databaseHost: config.databaseHost,
      podName: config.podName,
    });
  });

  app.get(['/', '/api'], (request, response) => {
    response.json({
      app: config.appName,
      message: config.message,
      databaseHost: config.databaseHost,
      podName: config.podName,
    });
  });

  app.get('/work', (request, response) => {
    const startedAt = Date.now();
    let total = 0;

    while (Date.now() - startedAt < 100) {
      total += Math.sqrt(total + 1);
    }

    response.json({
      status: 'worked',
      podName: config.podName,
    });
  });

  app.get('/db-check', async (request, response) => {
    const result = await checkDatabaseConnection();

    response.status(result.ok ? 200 : 503).json({
      ...result,
      databaseHost: config.databaseHost,
      databasePort: config.databasePort,
      podName: config.podName,
    });
  });

  app.use((request, response) => {
    response.status(404).json({ error: 'Not found' });
  });

  return app;
}

export function closeDatabasePool() {
  return pool.end();
}

function checkDatabaseConnection() {
  return pool
    .query('SELECT NOW() AS database_time')
    .then((result) => {
      return {
        ok: true,
        status: 'query-succeeded',
        databaseTime: result.rows[0].database_time,
      };
    })
    .catch((error) => {
      return {
        ok: false,
        status: 'query-failed',
        error: error.code || error.message,
      };
    });
}
