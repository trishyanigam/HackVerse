/**
 * Standard Logger interface wrapping native console functions.
 * Designed to easily switch / configure Winston or Pino in the future.
 */
const logger = {
  info: (message, ...meta) => {
    console.info(`[INFO] [${new Date().toISOString()}]: ${message}`, ...meta);
  },
  error: (message, ...meta) => {
    console.error(`[ERROR] [${new Date().toISOString()}]: ${message}`, ...meta);
  },
  warn: (message, ...meta) => {
    console.warn(`[WARN] [${new Date().toISOString()}]: ${message}`, ...meta);
  },
  debug: (message, ...meta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] [${new Date().toISOString()}]: ${message}`, ...meta);
    }
  },
};

module.exports = logger;
// Future TODO: Replace console functions with winston.createLogger configurations.
