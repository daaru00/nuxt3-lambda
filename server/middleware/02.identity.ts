export default defineEventHandler(async (event) => {
  const identity: ClientIdentity = {
    ip: getRequestIP(event, { xForwardedFor: true }) || getRequestIP(event),
    userAgent: getHeader(event, 'user-agent'),
    country: getHeader(event, 'cloudfront-viewer-country'),
    region: getHeader(event, 'cloudfront-viewer-country-region-name'),
    city: getHeader(event, 'cloudfront-viewer-city'),
    postalCode: getHeader(event, 'postal-code'),
    timezone: getHeader(event, 'cloudfront-viewer-time-zone')
  }
  console.log('identity', JSON.stringify(identity, null, 2))
  event.context.identity = identity
})
