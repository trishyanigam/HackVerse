const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const apiRouter = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ==========================================
// 1. Global Middleware Configurations
// ==========================================

// HTTP header security shield
app.use(helmet());

// Cross-Origin Resource Sharing (CORS) setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP request logging (Morgan) for dev and production modes
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Parse request payload body formats
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Parse request cookies
app.use(cookieParser());

// Serve static upload resources if any exist
app.use('/uploads', express.static('uploads'));

// ==========================================
// 2. Versioned API Routing
// ==========================================
app.use('/api/v1', apiRouter);

// Base route redirection indicator
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the HackVerse API Portal. Use /api/v1/health for service check.',
  });
});

// ==========================================
// 3. Centralized Error Handling Middleware
// ==========================================

// Catch 404 routes not matching api endpoints
app.use(notFound);

// Centralized error responder
app.use(errorHandler);

module.exports = app;
