FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

COPY package*.json ./
COPY .env .

RUN npm ci --include=dev
RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]