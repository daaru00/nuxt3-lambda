<template>
  <div>
    <NuxtWelcome />
    <!-- <p v-if="data">
      {{ data }}
    </p> -->
    <!-- <button @click="putIntoDb">
      Put into DB
    </button>
    <button @click="putEvent">
      Put event
    </button>
    <button @click="sendToQueue">
      Send to queue
    </button> -->
  </div>
</template>

<script setup>
// const { data } = useFetch('/api/echo', {
//   method: 'POST',
//   body: JSON.stringify({
//     test: 'this is a test'
//   })
// })

// const { data } = useFetch('/api/echo?test=123')

// const { data } = useFetch('/api/db/read')

// const putIntoDb = async () => {
//   const res = await fetch('/api/db/put', {
//     method: 'POST',
//     body: JSON.stringify({
//       test: 'this is a test'
//     })
//   })
//   const data = await res.json()
//   console.log(data);
// }

// const putEvent = async () => {
//   const res = await fetch('/api/event/put', {
//     method: 'POST',
//     body: JSON.stringify({
//       test: 'this is a test'
//     })
//   })
//   const data = await res.json()
//   console.log(data);
// }

// const sendToQueue = async () => {
//   const res = await fetch('/api/queue/send', {
//     method: 'POST',
//     body: JSON.stringify({
//       test: 'this is a test'
//     })
//   })
//   const data = await res.json()
//   console.log(data);
// }
</script>
