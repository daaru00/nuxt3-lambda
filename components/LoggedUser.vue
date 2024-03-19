<template>
  <h1>Hello {{ auth?.email }}</h1>
  <p>Username: {{ auth?.username }}</p>
  <p>Logged at: {{ auth?.auth_time }}</p>
</template>

<script setup>
const auth = useAuth()
</script>
