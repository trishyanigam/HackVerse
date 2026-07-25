# Use official Node.js LTS image as base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package manifests first for efficient caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source files
COPY . .

# Environment setup
EXPOSE 5000
ENV NODE_ENV=production

# Health check instruction
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/v1/health || exit 1

# Start production server
CMD ["node", "server.js"]
