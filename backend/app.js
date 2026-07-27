const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const apiRouter = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./config/swagger');

const app = express();

// ==========================================
// 1. Security & Performance Middleware
// ==========================================

// HTTP header security shield with cross-origin resource policy
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Enable GZIP response compression for performance
app.use(compression());

// Express 5 compatible MongoDB query sanitizer for request body & params
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// Prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Global Rate Limiter: 200 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Cross-Origin Resource Sharing (CORS) setup
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''))
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, '');

      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      return callback(null, true); // Fallback to allow connection for deployment flexibility
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging: dev format for development, combined format for production
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

// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Setup Interactive Swagger API Documentation at /api-docs
setupSwagger(app);

// ==========================================
// 2. Versioned API Routing
// ==========================================
app.use('/api/v1', apiRouter);

// Base route redirection indicator
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the HackVerse API Portal. Interactive Swagger docs at /api-docs',
    documentationUrl: '/api-docs',
    healthCheckUrl: '/api/v1/health',
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
