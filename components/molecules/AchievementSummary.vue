<template>
  <BaseCard class="achievement-summary" elevation="8" rounded="lg">
    <div class="achievement-summary__inner">
      <DonutChart :percentage="percentage" />
      <p class="text-body-1 mt-4">
        {{ ownedCount }} / {{ totalCount }} 匹
      </p>
      <p class="text-caption text-medium-emphasis">
        HOME図鑑 達成率
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
interface Props {
  ownedCount: number
  totalCount: number
  percentage: number
}

defineProps<Props>()
</script>

<style scoped>
.achievement-summary__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
}
</style>
