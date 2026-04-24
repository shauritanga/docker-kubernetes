FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .
RUN addgroup -S nodejs && adduser -S apiuser -G nodejs && chown -R apiuser:nodejs /app

USER apiuser
EXPOSE 8080
CMD ["npm", "start"]
