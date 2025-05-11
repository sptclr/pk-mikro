# Build Stage
FROM node:18 as build-stage

WORKDIR /app
COPY . .

# Set environment
COPY .env.gcp.dev ./.env

# Install dependencies and build Next.js
RUN npm install
RUN npm run build

# Production Stage
FROM node:18 as production-stage
WORKDIR /app

# Copy only necessary files
COPY --from=build-stage /app/.next .next
COPY --from=build-stage /app/public public
COPY --from=build-stage /app/package.json package.json
COPY --from=build-stage /app/node_modules node_modules

# Set environment variable for production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
