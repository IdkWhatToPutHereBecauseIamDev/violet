FROM node:22-slim
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
# We use server.js now instead of the missing lib/index.js
CMD ["node", "server.js"]
