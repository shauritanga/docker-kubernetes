import { closeDatabasePool, createApp } from './app.js';
import { config } from './config.js';

export function startServer() {
  const app = createApp();

  let server;

  const shutdown = async () => {
    if (!server) {
      return;
    }

    server.close(async () => {
      await closeDatabasePool();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return new Promise((resolve) => {
    server = app.listen(config.port, () => {
      console.log(
        JSON.stringify({
          message: 'server.listening',
          port: config.port,
          appName: config.appName,
        })
      );
      resolve(server);
    });
  });
}
