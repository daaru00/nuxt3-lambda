export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  if (['/login', '/logout'].includes(url)) {
    return
  }
  
  const runtimeConfig = useRuntimeConfig()
  const protectRoutes = runtimeConfig.auth?.routes || ['^/api']
  const isProtected = protectRoutes.some((route: string) => new RegExp(route).test(url)) 
  if (!isProtected) {
    return
  }

  const token = getCookie(event, runtimeConfig.auth?.cookie || 'id_token')
  if (!token) {
    console.error('Token cookie not found')
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const payload = await useCognitoJwtVerifier(token)
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const caller: AuthenticatedUser = {
    email: payload.email?.toString() || 'unknown'
  }

  console.log('auth', JSON.stringify(payload, null, 2))
  event.context.auth = caller
})
