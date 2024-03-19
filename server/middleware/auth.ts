export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  if (['/auth/authorize'].includes(url)) {
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

  const auth = await useCognitoJwtVerifier(token)
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  console.log('auth', JSON.stringify(auth, null, 2))
  event.context.auth = auth
})
