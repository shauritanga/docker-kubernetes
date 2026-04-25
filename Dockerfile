FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY index.js ./

USER node
EXPOSE 8080

CMD ["npm", "start"]
