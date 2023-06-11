import { SendMessageCommand } from "@aws-sdk/client-sqs";

export default defineEventHandler(async (event) => {
  const { client, queueUrl } = useSQS()

  const body = await readBody(event)
  const { MessageId: messageId } = await client.send(new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(body)
  }))

  return {
    id: messageId
  }
})
