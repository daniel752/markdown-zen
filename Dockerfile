# syntax=docker/dockerfile:1

# Run node.js environment
FROM node:18-alpine

# Define environment variables for ports
ENV NODE_ENV=production
ENV INTERNAL_PORT=8000
ENV EXTERNAL_PORT=5173
WORKDIR /app

# Install server-side dependencies
COPY package.json package-lock.json ./
RUN npm install

# Change to the client directory and install client-side dependencies
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install

# Go back to the project root
WORKDIR /app
# Setup entire project
RUN npm run setup-project

# Copy the entire project
COPY . .

CMD [ "npm", "run", "dev" ]
