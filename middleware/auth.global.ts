import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    await authStore.initAuthListener()
  }

  if (to.path === '/auth') {
    if (authStore.user) {
      return navigateTo('/')
    }
    return
  }

  if (!authStore.user) {
    return navigateTo('/auth')
  }
})
