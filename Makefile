# Variables

PROFILE := personal
REGION := eu-south-1
STACK_NAME := nuxt3-ssr
DISTRIBUTION_ID := E11BF46ZD12UY

# Build

install:
	npm install

dev:
	npm run dev

build:
	NITRO_PRESET=aws-lambda npm run build

# Deploy

deploy:
	make build
	make deploy-static
	make deploy-sam

deploy-static:
	aws --profile ${PROFILE} --region ${REGION} s3 cp --recursive .output/public s3://${STACK_NAME}-${REGION}/

deploy-sam:
	sam deploy

invalidation-cdn:
	aws --profile ${PROFILE} --region ${REGION} cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths '/*'

# Monitoring

logs:
	sam logs --profile ${PROFILE} --region ${REGION} --stack-name ${STACK_NAME} --tail

# Deleting

empty-bucket:
	aws --profile ${PROFILE} --region ${REGION} s3 rm s3://${STACK_NAME}-${REGION} --recursive

delete:
	sam delete
