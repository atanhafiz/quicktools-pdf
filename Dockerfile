FROM node:20-bullseye-slim
RUN apt-get update && apt-get install -y qpdf && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "server.js"]
