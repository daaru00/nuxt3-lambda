export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const url = new URL(runtimeConfig.cognito?.logoutEndpoint)
  url.searchParams.append('response_type', 'token')
  url.searchParams.append('client_id', runtimeConfig.cognito?.clientId)
  url.searchParams.append('redirect_uri', runtimeConfig.cognito?.redirectUri)
  url.searchParams.append('scope', runtimeConfig.cognito?.oauthScope)

  await sendRedirect(event, url.toString(), 302)
})
