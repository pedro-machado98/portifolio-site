# Pedro Machado - Portfolio

Personal portfolio website demonstrating expertise in full-stack engineering and cloud architecture.

Built as a monorepo containing a React frontend and AWS Serverless infrastructure. The architecture utilizes S3 and CloudFront for high-performance static hosting, alongside API Gateway, Lambda, and SES for the contact form backend.

## Structure

- `/frontend`: React application (Vite, TypeScript, Tailwind CSS, Framer Motion, i18next).
- `/infra`: AWS CDK infrastructure as code (S3, CloudFront, API Gateway, Lambda, IAM).

## Local Development

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Build & Deploy

### Frontend Build
To compile the frontend for production:
```bash
cd frontend
npm run build
```
This generates the optimized static files in the `frontend/dist/` directory.

### Infrastructure Deploy
To provision or update the AWS infrastructure using AWS CDK:
```bash
cd infra
npm install
npm run cdk deploy
```
*Note: Ensure your AWS CLI is configured with the necessary permissions before deploying.*
