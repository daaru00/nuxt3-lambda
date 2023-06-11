import { PutEventsCommand } from "@aws-sdk/client-eventbridge";

export default defineEventHandler(async (event) => {
  const { client, busName, source } = useEventBridge()

  const body = await readBody(event)
  const { Entries: entries } = await client.send(new PutEventsCommand({
    Entries: [{
      EventBusName: busName,
      Source: source,
      DetailType: 'Test',
      Detail: JSON.stringify(body)
    }]
  }))

  const entry = entries?.shift()
  if (entry?.ErrorCode) {
    console.error(entry);
    sendError(event, new Error(`${entry?.ErrorCode}: ${entry?.ErrorMessage}`))
  }

  return {
    id: entry?.EventId
  }
})
