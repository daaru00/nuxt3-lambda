export default function () {
  const config = useAppConfig()
  return useCookie(config.auth?.cookie || 'id_token', { secure: true })
}
