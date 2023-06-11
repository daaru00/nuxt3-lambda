// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // aws: {
    //   region: 'eu-west-1',
    //   profile: 'default'
    // },
    dynamodb: {
      tableName: process.env.DYNAMODB_TABLE,
    },
    sqs: {
      queueUrl: process.env.SQS_QUEUE_URL,
    },
    events: {
      busName: process.env.EVENT_BRIDGE_BUS,
    }
  }
})
