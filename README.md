# Playwright Automation Framework

## Local setup

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
2. Update `.env` with your local values:
   ```dotenv
   URL=https://naveenautomationlabs.com/opencart/
   EMAIL=prakashshailendra45@gmail.com
   PASSWORD=Jaymanti@123
   ```
3. Install dependencies:
   ```bash
   npm ci
   ```
4. Run tests locally (headed Chrome):
   ```bash
   npm run test:chrome
   ```
5. Run CI-style tests locally (headless Chrome):
   ```bash
   npm run test:ci
   ```

## Jenkins setup

1. Add the repository to Jenkins.
2. Create environment variables in the job configuration:
   - `URL`
   - `EMAIL`
   - `PASSWORD`
3. Use the provided `Jenkinsfile` or run the same commands in a Windows shell build step:
   ```bat
   npm ci
   npx playwright install
   npm run test:ci
   ```
4. If using the declarative pipeline, Jenkins will automatically use the `Jenkinsfile`.

## Notes

- `.env` is ignored by Git, so local credentials stay private.
- `playwright.config.ts` loads `.env` when present, and Jenkins uses injected environment variables.
- `fixtures/fixtures.ts` now uses `storageState.json` only for authenticated tests, so registration tests run unauthenticated.
