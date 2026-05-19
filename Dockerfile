FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm install --force

RUN npm list @playwright/test

RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]