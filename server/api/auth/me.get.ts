import { CognitoUser } from "~/server/utils/useCognitoJwtVerifier"

export default defineEventHandler(async (event) => {
  const user = event.context.auth as CognitoUser
  return user
})
