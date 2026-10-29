# Stage 1: Build the React application into static files
FROM node:22-alpine AS build

# Set /app as the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the remaining React application files into the container
COPY . .

# Build the React application and generate production files in the dist folder
RUN npm run build


# Stage 2: Serve the built React files using NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration into the NGINX configuration directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the generated dist files from Stage 1 into NGINX's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Document that NGINX listens on port 80 inside the container
EXPOSE 80

# Start NGINX in the foreground so the container keeps running
CMD ["nginx", "-g", "daemon off;"]