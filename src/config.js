function requireEnv(name, fallback) {
  const value = process.env[name] || fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getNumber(name, fallback) {
  const raw = process.env[name] || fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric environment variable: ${name}`);
  }
  return parsed;
}

export const config = {
  port: getNumber('PORT', 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: requireEnv(
    'DATABASE_URL',
    'postgres://claims_app:claims_app@localhost:5432/claims_db'
  ),
  shutdownTimeoutMs: getNumber('SHUTDOWN_TIMEOUT_MS', 10000),
  logLevel: process.env.LOG_LEVEL || 'info',
};
