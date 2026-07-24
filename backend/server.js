require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Initialize server bootstrap routine
const startServer = async () => {
  try {
    // 1. Establish database connections
    await connectDB();

    // 2. Start listening to port requests
    app.listen(PORT, () => {
      logger.info(`HackVerse Backend Server listening on port: ${PORT}`);
      logger.info(`Environment mode: ${process.env.NODE_ENV}`);
      logger.info(`Local Endpoint: http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to boot HackVerse server: ', err);
    process.exit(1);
  }
};

startServer();