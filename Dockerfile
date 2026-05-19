From mcr.microsoft.com/playwright:v1.59.1-noble
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
CMD ["npx", "playwright", "test"]
