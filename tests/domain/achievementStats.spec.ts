import { describe, expect, it } from 'vitest'
import { calculateAchievementStats } from '../../domain/achievementStats'

describe('calculateAchievementStats', () => {
  it('calculates correct percentage', () => {
    const result = calculateAchievementStats(721, 1591)
    expect(result.ownedCount).toBe(721)
    expect(result.totalCount).toBe(1591)
    expect(result.percentage).toBe(45.3)
  })

  it('returns 0% when no forms are owned', () => {
    const result = calculateAchievementStats(0, 1591)
    expect(result.ownedCount).toBe(0)
    expect(result.totalCount).toBe(1591)
    expect(result.percentage).toBe(0)
  })

  it('returns 100% when all forms are owned', () => {
    const result = calculateAchievementStats(1591, 1591)
    expect(result.ownedCount).toBe(1591)
    expect(result.totalCount).toBe(1591)
    expect(result.percentage).toBe(100)
  })

  it('returns 0% when totalCount is 0', () => {
    const result = calculateAchievementStats(0, 0)
    expect(result.ownedCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.percentage).toBe(0)
  })

  it('rounds to 1 decimal place', () => {
    const result = calculateAchievementStats(1, 3)
    expect(result.percentage).toBe(33.3)
  })

  it('rounds 99.99... to 100 only when fully complete', () => {
    const result = calculateAchievementStats(1590, 1591)
    expect(result.percentage).toBe(99.9)
  })

  it('handles small owned count', () => {
    const result = calculateAchievementStats(1, 1591)
    expect(result.percentage).toBe(0.1)
  })
})
