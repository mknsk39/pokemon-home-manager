<template>
  <BaseContainer class="fill-height justify-center align-center">
    <BaseCard class="pa-8 text-center">
      <BaseIcon icon="mdi-pokeball" size="64" class="mb-4" />
      <h1 class="text-h4 font-weight-bold mb-2">Pokemon HOME Manager</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        自分だけのロトム図鑑を作ろう！
      </p>
      <BaseButton size="large" prepend-icon="mdi-rocket-launch">
        Get Started
      </BaseButton>
    </BaseCard>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseButton from '../components/atoms/BaseButton.vue'
import BaseCard from '../components/atoms/BaseCard.vue'
import BaseContainer from '../components/atoms/BaseContainer.vue'
import BaseIcon from '../components/atoms/BaseIcon.vue'
</script>
