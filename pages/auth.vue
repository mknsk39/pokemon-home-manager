<template>
  <BaseContainer class="fill-height d-flex align-center justify-center">
    <AuthLoginCard
      :loading="authStore.loading"
      :error="authStore.error"
      @login="handleLogin"
    />
  </BaseContainer>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  void authStore.initAuthListener()
})

watch(
  () => authStore.user,
  (currentUser) => {
    if (currentUser) {
      navigateTo('/')
    }
  },
)

const handleLogin = async () => {
  try {
    await authStore.login()
  } catch {
    // Error state is handled in the store
  }
}
</script>
