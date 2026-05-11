# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests first for dependency install
COPY package.json package-lock.json ./

RUN npm install

# Copy source files
COPY . .

# Build the app with standalone output
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Install only production dependencies for the runtime
RUN npm install --production

# Expose port used by Next.js
EXPOSE 3000

# Default command for standalone build
CMD ["node", "server.js"]
