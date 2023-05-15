# Stage 1: Build Stage
FROM node:latest AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml* /app/

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install --production

# Copy the rest of the application code
COPY . /app

# Build the application (if required)
RUN pnpm run build

# Stage 2: Final Image
FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy the built files from the previous stage
COPY --from=builder /app/dist/ .

# Set the PORT environment variable
ENV PORT=80

# Expose the specified port
EXPOSE $PORT

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]