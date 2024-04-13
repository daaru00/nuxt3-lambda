import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

interface DynamoDBConfig {
  client: DynamoDBDocumentClient
  tableName: string
}

let config: DynamoDBConfig
export default function(): DynamoDBConfig {
  if (!config) {
    const runtimeConfig = useRuntimeConfig()
    const xray = useXRay()
    config = {
      client: DynamoDBDocumentClient.from(xray.captureAWSClient(new DynamoDBClient(useAwsConfig()))),
      tableName: runtimeConfig.dynamodb?.tableName
    }
  }
  return config
}
