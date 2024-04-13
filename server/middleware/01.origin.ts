export default defineEventHandler(async (event) => {
  const xray = useXRay()
  const subsegment = xray.openSegment('origin')

  const runtimeConfig = useRuntimeConfig()
  const headerName = runtimeConfig.origin?.headerName
  const headerValue = runtimeConfig.origin?.headerValue

  if (!headerName || !headerValue) {
    xray.addSegmentAnnotation(subsegment, 'result', 'disabled')
    xray.closeSegment(subsegment)
    return
  }

  const verificationHeader = getHeader(event, headerName)
  if (!verificationHeader || verificationHeader !== headerValue) {
    xray.addSegmentAnnotation(subsegment, 'result', 'invalid')
    xray.closeSegment(subsegment)
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  xray.addSegmentAnnotation(subsegment, 'result', 'valid')
  xray.closeSegment(subsegment)
})
