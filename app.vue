<template>
  <div v-show="auth">
    <LoggedUser />
  </div>
</template>

<script setup>
const auth = useAuth()

onMounted(async () => {
  const token = useToken()
  if (!token.value) {
    console.error('token not found in cookies')

    const hash = useRouteHash()
    if (!hash.value) {
      console.error('hash not found in URL')
      return await navigateTo('/auth/authorize', {
        external: true // force page refresh
      })
    }

    token.value = hash.value.id_token
    return await navigateTo('/', {
      external: true // force page refresh to remove hash
    })
  }

  const { data, status } = await useFetch('/api/auth/me', {
    method: 'GET',
  })

  if (status.value !== 'success') {
    console.log('invalid uth response', status.value)
    token.value = ''
    return await navigateTo('/auth/authorize', {
      external: true // force page refresh
    })
  }

  console.log('logged in', JSON.stringify(data.value))
  auth.value = data.value
})
</script>
