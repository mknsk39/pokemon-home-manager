<template>
  <DashboardView
    :owned-count="achievementStats.ownedCount"
    :total-count="achievementStats.totalCount"
    :percentage="achievementStats.percentage"
  />
</template>

<script setup lang="ts">
const masterData = useMasterData()
const ownershipStore = useOwnershipStore()
const { ownedFormIds } = storeToRefs(ownershipStore)

const { achievementStats } = useDashboard(masterData, ownedFormIds)
</script>
