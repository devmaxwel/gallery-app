# Use Node.js 18 base image
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./.env
EXPOSE 5000
CMD ["npm", "run", "dev"]
