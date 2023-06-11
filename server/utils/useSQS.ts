import { SQSClient } from "@aws-sdk/client-sqs";

interface SQSClientConfig {
  client: SQSClient
  queueUrl: string
}

let config: SQSClientConfig
export default function(): SQSClientConfig {
  if (!config) {
    const runtimeConfig = useRuntimeConfig()
    config = {
      client: new SQSClient(useAwsConfig()),
      queueUrl: runtimeConfig.sqs?.queueUrl || process.env.SQS_QUEUE_URL,
    }
  }
  return config
}
