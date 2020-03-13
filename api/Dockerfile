# Specify a base image
FROM node:12.13.0-alpine AS alpine
WORKDIR /app
# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install 
COPY . .
# Default command
CMD ["yarn", "start", "dev"]