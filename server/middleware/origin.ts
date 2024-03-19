export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const headerName = runtimeConfig.origin?.headerName
  const headerValue = runtimeConfig.origin?.headerValue

  if (!headerName || !headerValue) {
    return
  }

  const verificationHeader = getHeader(event, headerName)
  if (!verificationHeader || verificationHeader !== headerValue) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }
})
