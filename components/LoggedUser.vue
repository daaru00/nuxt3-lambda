<template>
  <h2>{{ auth?.email }}</h2>
  <button @click="logout">Logout</button>
</template>

<script setup>
const auth = useAuth()

const redirect = useRedirect()
const token = useToken()
const logout = async () => {
  token.value = ''
  redirect.logout()
}
</script>
