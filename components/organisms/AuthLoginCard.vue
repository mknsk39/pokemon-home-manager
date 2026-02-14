<template>
  <div class="auth-login-card">
    <BaseCard class="pa-8 text-center">
      <BaseIcon icon="mdi-pokeball" size="64" class="mb-4" />
      <h1 class="text-h4 font-weight-bold mb-2">Pokemon HOME Manager</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        自分だけのロトム図鑑を作ろう！
      </p>
      <BaseButton
        color="primary"
        size="large"
        prepend-icon="mdi-google"
        :loading="loading"
        @click="$emit('login')"
      >
        Googleでログイン
      </BaseButton>
      <p v-if="error" class="text-error text-caption mt-4">{{ error }}</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
  error?: string | null
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})

defineEmits<{ login: [] }>()
</script>

<style scoped>
.auth-login-card {
  width: min(420px, 100%);
}
</style>
