// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    title: 'Nuxt3 on Lambda',
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
      loginEndpoint: '',
      logoutEndpoint: '',
      redirectUri: '',
      clientId: '',
      userPoolId: '',
      oauthScope: 'aws.cognito.signin.user.admin openid profile'
    },
    dynamodb: {
      tableName: '',
    },
    sqs: {
      queueUrl: '',
    },
    events: {
      source: '',
      busName: 'default',
    }
  }
})
