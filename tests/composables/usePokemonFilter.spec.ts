import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { usePokemonFilter } from '../../composables/usePokemonFilter'
import type { MasterDataService } from '../../services/masterData'
import type { PokemonForm, PokemonSpecies } from '../../types/masterData'

const makeSpecies = (id: number, dexNo: number, name: string): PokemonSpecies => ({
  id,
  dexNo,
  name,
})

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

const speciesList: PokemonSpecies[] = [
  makeSpecies(1, 1, 'フシギダネ'),
  makeSpecies(3, 3, 'フシギバナ'),
  makeSpecies(25, 25, 'ピカチュウ'),
]

const formsMap: Record<number, PokemonForm[]> = {
  1: [makeForm({ id: 100, speciesId: 1, generation: 1 })],
  3: [
    makeForm({ id: 300, speciesId: 3, generation: 1 }),
    makeForm({ id: 301, speciesId: 3, generation: 1, isDefault: false, isMega: true }),
  ],
  25: [
    makeForm({ id: 2500, speciesId: 25, generation: 1 }),
    makeForm({ id: 2501, speciesId: 25, generation: 7, isDefault: false, region: 'alola' }),
  ],
}

const mockMasterData: MasterDataService = {
  listSpecies: () => speciesList,
  getSpecies: (id) => speciesList.find((s) => s.id === id),
  listAllForms: () => Object.values(formsMap).flat(),
  listForms: (speciesId) => formsMap[speciesId] ?? [],
  getForm: () => undefined,
}

describe('usePokemonFilter', () => {
  it('returns all species when no filter is active', () => {
    const { filteredSpecies, isFilterActive } = usePokemonFilter(mockMasterData)

    expect(filteredSpecies.value).toHaveLength(3)
    expect(isFilterActive.value).toBe(false)
  })

  it('filters species by search text reactively', () => {
    const { filteredSpecies, searchText } = usePokemonFilter(mockMasterData)

    searchText.value = 'フシギ'
    expect(filteredSpecies.value).toHaveLength(2)
    expect(filteredSpecies.value.map((s) => s.name)).toEqual(['フシギダネ', 'フシギバナ'])
  })

  it('filters species by generations reactively', () => {
    const { filteredSpecies, generations } = usePokemonFilter(mockMasterData)

    generations.value = [1]
    expect(filteredSpecies.value).toHaveLength(3)
  })

  it('filters forms by region reactively', () => {
    const { filteredForms, regions } = usePokemonFilter(mockMasterData)

    regions.value = ['alola']
    expect(filteredForms.value).toHaveLength(1)
    expect(filteredForms.value[0].id).toBe(2501)
  })

  it('filters forms by special forms reactively', () => {
    const { filteredForms, specialForms } = usePokemonFilter(mockMasterData)

    specialForms.value = ['mega']
    expect(filteredForms.value).toHaveLength(1)
    expect(filteredForms.value[0].id).toBe(301)
  })

  it('isFilterActive returns true when any filter is set', () => {
    const { isFilterActive, searchText } = usePokemonFilter(mockMasterData)

    expect(isFilterActive.value).toBe(false)
    searchText.value = 'ピカ'
    expect(isFilterActive.value).toBe(true)
  })

  it('resetFilters clears all conditions', () => {
    const { filteredSpecies, filteredForms, searchText, generations, regions, specialForms, isFilterActive, resetFilters } =
      usePokemonFilter(mockMasterData)

    searchText.value = 'ピカ'
    generations.value = [1]
    regions.value = ['alola']
    specialForms.value = ['mega']

    resetFilters()

    expect(searchText.value).toBe('')
    expect(generations.value).toEqual([])
    expect(regions.value).toEqual([])
    expect(specialForms.value).toEqual([])
    expect(isFilterActive.value).toBe(false)
    expect(filteredSpecies.value).toHaveLength(3)
    expect(filteredForms.value).toHaveLength(5)
  })

  it('filters forms by ownership (owned)', () => {
    const ownedFormIds = ref(new Set([100, 300]))
    const { filteredForms, ownershipFilter } = usePokemonFilter(mockMasterData, ownedFormIds)

    ownershipFilter.value = ['owned']
    expect(filteredForms.value).toHaveLength(2)
    expect(filteredForms.value.map((f) => f.id)).toEqual([100, 300])
  })

  it('filters forms by ownership (unowned)', () => {
    const ownedFormIds = ref(new Set([100, 300]))
    const { filteredForms, ownershipFilter } = usePokemonFilter(mockMasterData, ownedFormIds)

    ownershipFilter.value = ['unowned']
    expect(filteredForms.value).toHaveLength(3)
  })

  it('filters species by ownership (owned = all forms owned)', () => {
    const ownedFormIds = ref(new Set([100]))
    const { filteredSpecies, ownershipFilter } = usePokemonFilter(mockMasterData, ownedFormIds)

    ownershipFilter.value = ['owned']
    // species 1 has 1 form (100) → all owned
    expect(filteredSpecies.value).toHaveLength(1)
    expect(filteredSpecies.value[0].id).toBe(1)
  })

  it('filters species by ownership (unowned = no forms owned)', () => {
    const ownedFormIds = ref(new Set([100]))
    const { filteredSpecies, ownershipFilter } = usePokemonFilter(mockMasterData, ownedFormIds)

    ownershipFilter.value = ['unowned']
    // species 3 has 2 forms (300, 301) → none owned
    // species 25 has 2 forms (2500, 2501) → none owned
    expect(filteredSpecies.value).toHaveLength(2)
  })

  it('isFilterActive is true when ownershipFilter is set', () => {
    const { isFilterActive, ownershipFilter } = usePokemonFilter(mockMasterData)

    expect(isFilterActive.value).toBe(false)
    ownershipFilter.value = ['owned']
    expect(isFilterActive.value).toBe(true)
  })

  it('resetFilters also clears ownershipFilter', () => {
    const { ownershipFilter, resetFilters } = usePokemonFilter(mockMasterData)

    ownershipFilter.value = ['owned']
    resetFilters()
    expect(ownershipFilter.value).toEqual([])
  })
})
