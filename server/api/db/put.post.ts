import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export default defineEventHandler(async (event) => {
  const { client, tableName } = useDynamoDB()

  const body = await readBody(event)
  body.id = randomUUID()

  await client.send(new PutCommand({
    TableName: tableName,
    Item: body
  }))
  
  return {
    id: body.id
  }
})
