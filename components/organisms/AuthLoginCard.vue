<template>
  <div class="auth-login-card">
    <AtomCard class="pa-8 text-center">
      <AtomIcon icon="mdi-pokeball" size="64" class="mb-4" />
      <h1 class="text-h4 font-weight-bold mb-2">Pokemon HOME Manager</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        自分だけのロトム図鑑を作ろう！
      </p>
      <AtomButton
        color="primary"
        size="large"
        prepend-icon="mdi-google"
        :loading="loading"
        @click="$emit('login')"
      >
        Googleでログイン
      </AtomButton>
      <p v-if="error" class="text-error text-caption mt-4">{{ error }}</p>
    </AtomCard>
  </div>
</template>

<script setup lang="ts">
import AtomButton from '../atoms/AtomButton.vue'
import AtomCard from '../atoms/AtomCard.vue'
import AtomIcon from '../atoms/AtomIcon.vue'

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
