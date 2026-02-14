import type { Ref } from 'vue'
import { computed } from 'vue'
import type { MasterDataService } from '../services/masterData'
import { calculateAchievementStats } from '../domain/achievementStats'

export const useDashboard = (
  masterData: MasterDataService,
  ownedFormIds: Ref<Set<number>>,
) => {
  const allForms = masterData.listAllForms()

  const achievementStats = computed(() => {
    const totalCount = allForms.length
    const ownedCount = allForms.filter((f) => ownedFormIds.value.has(f.id)).length
    return calculateAchievementStats(ownedCount, totalCount)
  })

  return { achievementStats }
}
