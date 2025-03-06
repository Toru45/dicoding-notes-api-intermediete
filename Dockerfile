FROM node:22.14-alpine

WORKDIR /app

LABEL org.opencontainers.image.source=https://github.com/Toru45/dicoding-notes-api-intermediete

COPY package*.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start:prod"] 