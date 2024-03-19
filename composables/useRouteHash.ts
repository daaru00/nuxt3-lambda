export default function () {
  const route = useRoute()
  if (route.hash === '') {
    return toRef(() => null)
  }

  const hash = route.hash.slice(1, route.hash.length)
  const parameters = hash.split('&').reduce((acc: any, el) => {
    const [key, value] = el.split('=')
    acc[key] = value
    return acc
  }, {})

  return toRef(() => parameters)
}
