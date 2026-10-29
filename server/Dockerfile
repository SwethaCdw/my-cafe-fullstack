# Use Node.js 22 Alpine as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests into the container
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the application source code into the container
COPY . .

# Set the application environment to production
ENV NODE_ENV=production

# Document the port on which the backend listens
EXPOSE 4000

# Start the backend application
CMD ["npm", "start"]