<template>
  <BaseContainer class="dashboard-view">
    <div class="dashboard-view__content">
      <AchievementSummary
        :owned-count="ownedCount"
        :total-count="totalCount"
        :percentage="percentage"
      />
    </div>
  </BaseContainer>
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
.dashboard-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-view__content {
  width: 100%;
  max-width: 400px;
}
</style>
