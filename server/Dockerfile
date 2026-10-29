FROM node:22-alpine
WORKDIR /app

# Copy dependency manifest first to make dependency installation cacheable.
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source after dependencies.
COPY . .

ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "start"]
