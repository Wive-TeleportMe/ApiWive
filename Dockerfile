# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /api

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to run the API
CMD ["node", "./src/camera.js"]