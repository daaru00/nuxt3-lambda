export default defineEventHandler(async (event) => {
  const xray = useXRay()
  const subsegment = xray.openSegment('identity')

  event.context.identity = {
    ip: getRequestIP(event, { xForwardedFor: true }) || getRequestIP(event),
    userAgent: getHeader(event, 'user-agent'),
    country: getHeader(event, 'cloudfront-viewer-country'),
    region: getHeader(event, 'cloudfront-viewer-country-region-name'),
    city: getHeader(event, 'cloudfront-viewer-city'),
    postalCode: getHeader(event, 'postal-code'),
    timezone: getHeader(event, 'cloudfront-viewer-time-zone')
  } as ClientIdentity

  xray.addSegmentMetadata(subsegment, 'identity', event.context.identity)
  xray.closeSegment(subsegment)
})
