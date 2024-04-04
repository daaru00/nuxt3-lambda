export default defineEventHandler(async (event) => {
  const user = event.context.auth as AuthenticatedUser
  return user
})
