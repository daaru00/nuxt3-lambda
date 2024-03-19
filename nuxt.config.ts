// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    auth: {
      cookie: 'id_token'
    }
  },
  runtimeConfig: {
    // aws: {
    //   region: 'eu-west-1',
    //   profile: 'default'
    // },
    origin: {
      headerName: '',
      headerValue: '',
    },
    auth: {
      cookie: 'id_token',
      routes: ['^/api'],
    },
    cognito: {
      authorizeUri: '',
      redirectUri: '',
      clientId: '',
      userPoolId: '',
    },
    dynamodb: {
      tableName: '',
    },
    sqs: {
      queueUrl: '',
    },
    events: {
      source: '',
      busName: '',
    }
  }
})
