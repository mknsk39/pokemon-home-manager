import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useDashboard } from '../../composables/useDashboard'
import type { MasterDataService } from '../../services/masterData'
import type { PokemonForm } from '../../types/masterData'

const makeForm = (
  overrides: Partial<PokemonForm> & Pick<PokemonForm, 'id' | 'speciesId'>,
): PokemonForm => ({
  formIndex: 0,
  formName: '',
  imageUrl: '',
  generation: 1,
  genderType: 'both',
  isDefault: true,
  isMega: false,
  isGigantamax: false,
  isPrimal: false,
  ...overrides,
})

const allForms = [
  makeForm({ id: 1, speciesId: 1 }),
  makeForm({ id: 2, speciesId: 1, isDefault: false }),
  makeForm({ id: 3, speciesId: 2 }),
  makeForm({ id: 4, speciesId: 3 }),
  makeForm({ id: 5, speciesId: 3, isDefault: false }),
]

const mockMasterData: MasterDataService = {
  listSpecies: () => [],
  getSpecies: () => undefined,
  listAllForms: () => allForms,
  listForms: () => [],
  getForm: () => undefined,
}

describe('useDashboard', () => {
  it('calculates achievement stats from ownedFormIds', () => {
    const ownedFormIds = ref(new Set([1, 3]))
    const { achievementStats } = useDashboard(mockMasterData, ownedFormIds)

    expect(achievementStats.value.ownedCount).toBe(2)
    expect(achievementStats.value.totalCount).toBe(5)
    expect(achievementStats.value.percentage).toBe(40)
  })

  it('reacts to ownedFormIds changes', () => {
    const ownedFormIds = ref(new Set<number>())
    const { achievementStats } = useDashboard(mockMasterData, ownedFormIds)

    expect(achievementStats.value.ownedCount).toBe(0)
    expect(achievementStats.value.percentage).toBe(0)

    ownedFormIds.value = new Set([1, 2, 3])
    expect(achievementStats.value.ownedCount).toBe(3)
    expect(achievementStats.value.percentage).toBe(60)
  })

  it('handles empty ownedFormIds', () => {
    const ownedFormIds = ref(new Set<number>())
    const { achievementStats } = useDashboard(mockMasterData, ownedFormIds)

    expect(achievementStats.value.ownedCount).toBe(0)
    expect(achievementStats.value.totalCount).toBe(5)
    expect(achievementStats.value.percentage).toBe(0)
  })

  it('handles empty master data', () => {
    const emptyMasterData: MasterDataService = {
      listSpecies: () => [],
      getSpecies: () => undefined,
      listAllForms: () => [],
      listForms: () => [],
      getForm: () => undefined,
    }
    const ownedFormIds = ref(new Set([1, 2]))
    const { achievementStats } = useDashboard(emptyMasterData, ownedFormIds)

    expect(achievementStats.value.ownedCount).toBe(0)
    expect(achievementStats.value.totalCount).toBe(0)
    expect(achievementStats.value.percentage).toBe(0)
  })
})
