From mcr.microsoft.com/playwright:v1.59.1-noble
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
RUN npx playwright install --with-deps
COPY . .
CMD ["npx", "playwright", "test"]
