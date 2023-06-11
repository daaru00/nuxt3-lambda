# Nuxt 3 On Lambda 
## Minimal Starter

Look at the documentations below to learn more: 
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- [Nitro AWS Lambda preset](https://nitro.unjs.io/deploy/providers/aws)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

## Setup

Make sure to install the dependencies:
```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`
```bash
npm run dev
```

## Production

Build the application for production:
```bash
npm run build
```

Locally preview production build:
```bash
npm run preview
```

## Deploy

Build the application using Lambda preset:
```bash
NITRO_PRESET=aws-lambda npm run build
```

Before every SAM deploy uploads the static files to the S3 bucket:
```bash
aws --profile <profile name> --region <region> s3 cp --recursive .output/public s3://<bucket name>/
```

Executing the **first deploy** for the SAM applications:
```bash
sam deploy --profile <profile name> --region <region> --guided
```
for subsequent deploys of application SAM:
```bash
sam deploy
```

Invalidate CloudFront cache in front of Nuxt3 application:
```bash
aws --profile <profile name> --region <region> cloudfront create-invalidation --distribution-id <distribution id> --paths '/*'
```
