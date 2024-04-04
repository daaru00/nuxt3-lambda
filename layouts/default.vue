<template>
  <div v-if="isLoggedIn">
    <h1>{{ config.title  }}</h1>
    <LoggedUser />
    <slot />
  </div>
</template>

<script setup>
const config = useAppConfig()

const token = useToken()
const api = useApi()
const auth = useAuth()
const redirect = useRedirect()

const isLoggedIn = computed(() => !!auth.value)

onMounted(async () => {
  if (!token.value) {
    console.error('token not found in cookies')

    const hash = useRouteHash()
    if (!hash.value) {
      console.error('token not found in URL hash')
      return redirect.login()
    }

    console.log('token found in URL hash')
    token.value = hash.value.id_token
    return redirect.home()
  } else {
    console.log('token found in cookies')
  }

  try {
    auth.value = await api.getMe()
    console.log('user logged in', JSON.stringify(auth.value))
  } catch (error) {
    console.log('invalid login', error)
    token.value = ''
    return redirect.login()
  }
})
</script>
