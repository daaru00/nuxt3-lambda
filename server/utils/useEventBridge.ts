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
    const xray = useXRay()
    config = {
      client: xray.captureAWSClient(new EventBridgeClient(useAwsConfig())),
      busName: runtimeConfig.events?.busName,
      source: runtimeConfig.events?.source
    }
  }
  return config
}
