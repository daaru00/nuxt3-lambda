import { SQSClient } from "@aws-sdk/client-sqs";

interface SQSClientConfig {
  client: SQSClient
  queueUrl: string
}

let config: SQSClientConfig
export default function(): SQSClientConfig {
  if (!config) {
    const runtimeConfig = useRuntimeConfig()
    const xray = useXRay()
    config = {
      client: xray.captureAWSClient(new SQSClient(useAwsConfig())),
      queueUrl: runtimeConfig.sqs?.queueUrl,
    }
  }
  return config
}
