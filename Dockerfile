# Use the official Node.js image as the base image
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3232

# Command to run migrations and start the application
CMD ["sh", "./docker-entrypoint.sh"]