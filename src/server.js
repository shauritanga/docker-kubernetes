import http from 'node:http';
import { createApp } from './app.js';
import { config } from './config.js';
import { pool } from './db/pool.js';
import { initializeSchema } from './db/schema.js';

export async function startServer() {
  await initializeSchema();
  console.log(
    JSON.stringify({
      message: 'server.bootstrap.complete',
      port: config.port,
      nodeEnv: config.nodeEnv,
      logLevel: config.logLevel,
    })
  );

  const app = createApp();
  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log(
      JSON.stringify({
        message: 'server.listening',
        port: config.port,
      })
    );
  });

  let shuttingDown = false;

  const shutdown = async (signal) => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;
    console.log(JSON.stringify({ message: 'server.shutdown.started', signal }));
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });

    setTimeout(() => {
      console.error(JSON.stringify({ message: 'server.shutdown.timeout' }));
      process.exit(1);
    }, config.shutdownTimeoutMs).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  return server;
}
