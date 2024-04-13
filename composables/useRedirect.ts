export default function () {

  async function home() {
    return await navigateTo('/', {
      external: true // force page refresh to remove hash
    })
  }

  async function login() {
    return await navigateTo('/auth/login', {
      external: true // force page refresh for server route hit
    })
  }

  async function logout() {
    return await navigateTo('/auth/logout', {
      external: true // force page refresh for server route hit
    })
  }

  return {
    home,
    login,
    logout,
  }
}
