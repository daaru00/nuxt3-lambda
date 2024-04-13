export default defineEventHandler(async (event) => {
  const xray = useXRay()
  const subsegment = xray.openSegment('auth')

  const url = event.node.req.url || ''
  xray.addSegmentAnnotation(subsegment, 'url', url)

  if (['/auth/login', '/auth/logout'].includes(url)) {
    xray.addSegmentAnnotation(subsegment, 'result', 'skipped')
    xray.closeSegment(subsegment)
    return
  }
  
  const runtimeConfig = useRuntimeConfig()
  const protectRoutes = runtimeConfig.auth?.routes || ['^/api']
  const isProtected = protectRoutes.some((route: string) => new RegExp(route).test(url)) 
  if (!isProtected) {
    xray.addSegmentAnnotation(subsegment, 'result', 'skipped')
    xray.closeSegment(subsegment)
    return
  }

  const token = getCookie(event, runtimeConfig.auth?.cookie || 'id_token')
  if (!token) {
    xray.addSegmentAnnotation(subsegment, 'result', 'not-found')
    xray.closeSegment(subsegment)

    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const payload = await useCognitoJwtVerifier(token)
  if (!payload) {
    xray.addSegmentAnnotation(subsegment, 'result', 'invalid')
    xray.closeSegment(subsegment)

    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  xray.addSegmentAnnotation(subsegment, 'result', 'valid')

  event.context.auth = {
    email: payload.email?.toString() || 'unknown'
  } as AuthenticatedUser

  xray.addSegmentMetadata(subsegment, 'user', event.context.auth)
  xray.closeSegment(subsegment)
})
