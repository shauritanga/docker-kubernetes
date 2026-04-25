export const config = {
  port: Number(process.env.PORT || 8080),
  appName: process.env.APP_NAME || 'beginner-api',
  message: process.env.MESSAGE || 'Hello from Kubernetes',
  databaseHost: process.env.DATABASE_HOST || 'not-configured',
  databasePort: Number(process.env.DATABASE_PORT || 5432),
  databaseName: process.env.POSTGRES_DB || 'beginner_db',
  databaseUser: process.env.POSTGRES_USER || 'beginner',
  databasePassword: process.env.POSTGRES_PASSWORD || 'beginner',
  podName: process.env.HOSTNAME || 'local-machine',
};
