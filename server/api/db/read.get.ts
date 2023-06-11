import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export default defineEventHandler(async (event) => {
  const { client, tableName } = useDynamoDB()

  const { Items: items } = await client.send(new ScanCommand({
    TableName: tableName
  }))
  
  return {
    items,
  }
})
