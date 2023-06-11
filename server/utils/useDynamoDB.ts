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
    config = {
      client: DynamoDBDocumentClient.from(
        new DynamoDBClient(useAwsConfig())
      ),
      tableName: runtimeConfig.dynamodb?.tableName || process.env.DYNAMODB_TABLE
    }
  }
  return config
}
