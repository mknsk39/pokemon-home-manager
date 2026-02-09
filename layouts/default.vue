<template>
  <div class="app-layout">
    <AppHeader
      v-if="!isAuthPage"
      :profile="authStore.profile"
      :logout-loading="logoutLoading"
      :error="authStore.error"
      @logout="handleLogout"
    />
    <main class="app-layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/organisms/AppHeader.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const route = useRoute()

const isAuthPage = computed(() => route.path === '/auth')

const logoutLoading = ref(false)

const handleLogout = async () => {
  logoutLoading.value = true
  try {
    await authStore.logout()
    await navigateTo('/auth')
  } finally {
    logoutLoading.value = false
  }
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

