<template>
  <AtomContainer class="fill-height justify-center align-center">
    <AtomCard class="pa-8 text-center">
      <AtomIcon icon="mdi-pokeball" size="64" class="mb-4" />
      <h1 class="text-h4 font-weight-bold mb-2">Pokemon HOME Manager</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        自分だけのロトム図鑑を作ろう！
      </p>
      <AtomButton size="large" prepend-icon="mdi-rocket-launch">
        Get Started
      </AtomButton>
    </AtomCard>
  </AtomContainer>
</template>

<script setup lang="ts">
import AtomButton from '../components/atoms/AtomButton.vue'
import AtomCard from '../components/atoms/AtomCard.vue'
import AtomContainer from '../components/atoms/AtomContainer.vue'
import AtomIcon from '../components/atoms/AtomIcon.vue'
</script>
