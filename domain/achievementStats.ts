import type { AchievementStats } from '../types/dashboard'

export const calculateAchievementStats = (
  ownedCount: number,
  totalCount: number,
): AchievementStats => {
  const percentage = totalCount === 0
    ? 0
    : Math.round((ownedCount / totalCount) * 1000) / 10

  return { ownedCount, totalCount, percentage }
}
