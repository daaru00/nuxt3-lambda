import { fromIni, fromEnv } from "@aws-sdk/credential-providers";
import type { AwsCredentialIdentityProvider } from "@aws-sdk/types";

interface AwsConfig {
  region: string
  credentials: AwsCredentialIdentityProvider
}

let config: AwsConfig
export default function(): AwsConfig {
  if (!config) {
    const runtimeConfig = useRuntimeConfig()
    const profile = runtimeConfig.aws?.profile || process.env.AWS_PROFILE || process.env.AWS_DEFAULT_PROFILE;
    config = {
      region: runtimeConfig.aws?.region || process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || '',
      credentials: profile
        ? fromIni({
            profile: profile,
          })
        : fromEnv()
    }
  }
  return config
}
