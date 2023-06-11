import { EventBridgeClient } from "@aws-sdk/client-eventbridge";

interface EventBridgeClientConfig {
  client: EventBridgeClient
  busName: string
  source: string
}

let config: EventBridgeClientConfig
export default function(): EventBridgeClientConfig {
  if (!config) {
    const runtimeConfig = useRuntimeConfig()
    config = {
      client: new EventBridgeClient(useAwsConfig()),
      busName: runtimeConfig.events?.busName || process.env.EVENT_BRIDGE_BUS || 'default',
      source: runtimeConfig.events?.source || process.env.EVENT_BRIDGE_SOURCE || 'nuxt'
    }
  }
  return config
}
