-include .env

# Build

install:
	npm install

dev:
	npm run dev

build:
	NITRO_PRESET=aws-lambda npm run build

clean:
	rm -rf .nuxt
	rm -rf .output
	rm -rf node_modules

# Deploy

deploy-frontend:
	aws --profile ${AWS_PROFILE} --region ${AWS_REGION} s3 cp --recursive .output/public s3://${STACK_NAME}-${AWS_REGION}/

deploy-backend:
	sam deploy --profile ${AWS_PROFILE} --region ${AWS_REGION} --stack-name ${STACK_NAME} --resolve-s3 --capabilities CAPABILITY_IAM

invalidation-cdn:
	aws --profile ${AWS_PROFILE} --region ${AWS_REGION} cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths '/*'

# Monitoring

logs:
	sam logs --profile ${AWS_PROFILE} --region ${AWS_REGION} --stack-name ${STACK_NAME} --tail

# Deleting

delete-frontend:
	aws --profile ${AWS_PROFILE} --region ${AWS_REGION} s3 rm s3://${STACK_NAME}-${AWS_REGION} --recursive

delete-backend:
	sam delete --stack-name ${STACK_NAME}
