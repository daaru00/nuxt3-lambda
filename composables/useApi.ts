export default function () {

  async function unauthorizedCatcher(response: Response) {
    if (response.status === 401) {
      await navigateTo('/auth/authorize', {
        external: true // force page refresh
      })
      throw new Error('Unauthorized')
    }
    return response
  }

  async function errorCatcher(response: Response) {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  }

  async function jsonResponse(response: Response) {
    return response.json()
  }

  async function getMe() {
    return await fetch('/api/auth/me')
      .then(errorCatcher)
      .then(jsonResponse)
  }

  return {
    getMe
  }
}
