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
import { onMounted, watch } from 'vue'
import AuthLoginCard from '../components/organisms/AuthLoginCard.vue'
import BaseContainer from '../components/atoms/BaseContainer.vue'
import { useAuthStore } from '../stores/auth'

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
