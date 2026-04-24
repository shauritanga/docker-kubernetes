import { startServer } from './src/server.js';

startServer().catch((error) => {
  console.error('Failed to start server');
  console.error(error);
  process.exit(1);
});
