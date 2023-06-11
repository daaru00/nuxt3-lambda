export default defineEventHandler(async (event) => {
  const query = await getQuery(event)
  return query
})
