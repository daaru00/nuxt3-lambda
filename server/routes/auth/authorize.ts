export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const url = new URL(runtimeConfig.cognito?.authorizeUri)
  url.searchParams.append('response_type', 'token')
  url.searchParams.append('client_id', runtimeConfig.cognito?.clientId)
  url.searchParams.append('redirect_uri', runtimeConfig.cognito?.redirectUri)
  url.searchParams.append('scope', 'aws.cognito.signin.user.admin openid profile')

  await sendRedirect(event, url.toString(), 302)
})
