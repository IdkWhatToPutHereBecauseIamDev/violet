FROM node:22-slim

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies ignoring the lockfile requirement
RUN npm install

# Copy the rest of your files
COPY . .

# Set the port
EXPOSE 8080

# Start the server
CMD ["node", "lib/index.js"]
