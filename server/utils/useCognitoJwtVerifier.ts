import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';

interface InternalCognitoJwtVerifier extends CognitoJwtVerifierSingleUserPool<{
  userPoolId: string
  tokenUse: 'id'|'access'|null
  clientId: string
}>{}

export interface CognitoUser {
  sub: string
  email: string
  email_verified: boolean
  username: string
  auth_time: Date
}

let verifier: InternalCognitoJwtVerifier
export default async function(token: string): Promise<CognitoUser|null> {
  if (!verifier) {
    const runtimeConfig = useRuntimeConfig()
    verifier = CognitoJwtVerifier.create({
      userPoolId: runtimeConfig.cognito?.userPoolId,
      clientId: runtimeConfig.cognito?.clientId,
      tokenUse: 'id',
    })
  }

  try {
    const payload = await verifier.verify(token);
    return {
      sub: payload.sub,
      email: payload.email,
      email_verified: payload.email_verified,
      username: payload['cognito:username'],
      auth_time: new Date(payload.auth_time * 1000)
    } as CognitoUser;
  } catch(e) {
    console.error("Token is invalid:", e);
    return null
  }
}
