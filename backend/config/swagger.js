const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ===================================================
// OpenAPI / Swagger Specification Config
// ===================================================

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HackVerse API Portal',
      version: '1.0.0',
      description:
        'Production-grade RESTful API documentation for the HackVerse Hackathon Management Platform.',
      contact: {
        name: 'HackVerse DeepMind Engineering',
        email: 'support@hackverse.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Local Server',
      },
      {
        url: 'https://api.hackverse.com/api/v1',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js', './config/swagger.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  // Serve Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve raw JSON spec at /api-docs-json
  app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = setupSwagger;
