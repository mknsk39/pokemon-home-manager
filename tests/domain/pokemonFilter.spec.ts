import { describe, expect, it } from 'vitest'
import { buildSpeciesFilterMeta, filterForms, filterSpecies } from '../../domain/pokemonFilter'
import type { PokemonForm, PokemonSpecies } from '../../types/masterData'
import type { PokemonFilterCondition } from '../../types/pokemonFilter'

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

const emptyCondition: PokemonFilterCondition = {
  searchText: '',
  generations: [],
  regions: [],
  specialForms: [],
  genderTypes: [],
  ownershipFilter: [],
}

const species = [
  makeSpecies(1, 1, 'フシギダネ'),
  makeSpecies(2, 2, 'フシギソウ'),
  makeSpecies(3, 3, 'フシギバナ'),
  makeSpecies(25, 25, 'ピカチュウ'),
  makeSpecies(26, 26, 'ライチュウ'),
  makeSpecies(150, 150, 'ミュウツー'),
]

const formsMap: Record<number, PokemonForm[]> = {
  1: [makeForm({ id: 100, speciesId: 1, generation: 1 })],
  2: [makeForm({ id: 200, speciesId: 2, generation: 1 })],
  3: [
    makeForm({ id: 300, speciesId: 3, generation: 1 }),
    makeForm({ id: 301, speciesId: 3, generation: 1, isDefault: false, isMega: true, formName: 'メガフシギバナ' }),
  ],
  25: [
    makeForm({ id: 2500, speciesId: 25, generation: 1, genderType: 'male' }),
    makeForm({ id: 2501, speciesId: 25, generation: 7, isDefault: false, region: 'alola', formName: 'アローラのすがた' }),
    makeForm({ id: 2502, speciesId: 25, generation: 1, isDefault: false, isGigantamax: true, formName: 'キョダイマックス' }),
  ],
  26: [
    makeForm({ id: 2600, speciesId: 26, generation: 1, genderType: 'female' }),
    makeForm({ id: 2601, speciesId: 26, generation: 7, isDefault: false, region: 'alola', formName: 'アローラのすがた' }),
  ],
  150: [
    makeForm({ id: 15000, speciesId: 150, generation: 1, genderType: 'genderless' }),
    makeForm({ id: 15001, speciesId: 150, generation: 1, isDefault: false, isMega: true, formName: 'メガミュウツーX', genderType: 'genderless' }),
    makeForm({ id: 15002, speciesId: 150, generation: 1, isDefault: false, isMega: true, formName: 'メガミュウツーY', genderType: 'genderless' }),
  ],
}

const getFormsFn = (speciesId: number) => formsMap[speciesId] ?? []

describe('buildSpeciesFilterMeta', () => {
  it('builds meta for each species from forms data', () => {
    const meta = buildSpeciesFilterMeta(species, getFormsFn)

    expect(meta.size).toBe(species.length)

    const bulbasaurMeta = meta.get(1)!
    expect(bulbasaurMeta.generation).toBe(1)
    expect(bulbasaurMeta.regions).toEqual([])
    expect(bulbasaurMeta.hasMega).toBe(false)

    const venusaurMeta = meta.get(3)!
    expect(venusaurMeta.hasMega).toBe(true)
    expect(venusaurMeta.hasGigantamax).toBe(false)

    const pikachuMeta = meta.get(25)!
    expect(pikachuMeta.generation).toBe(1)
    expect(pikachuMeta.regions).toEqual(['alola'])
    expect(pikachuMeta.hasGigantamax).toBe(true)

    const mewtwoMeta = meta.get(150)!
    expect(mewtwoMeta.hasMega).toBe(true)
    expect(mewtwoMeta.hasPrimal).toBe(false)
  })
})

describe('filterSpecies', () => {
  const meta = buildSpeciesFilterMeta(species, getFormsFn)

  it('returns all species when no filter is applied', () => {
    const result = filterSpecies(species, meta, emptyCondition)
    expect(result).toHaveLength(species.length)
  })

  it('filters by name (partial match)', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: 'フシギ',
    })
    expect(result).toHaveLength(3)
    expect(result.map((s) => s.name)).toEqual(['フシギダネ', 'フシギソウ', 'フシギバナ'])
  })

  it('filters by dexNo (prefix match)', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: '25',
    })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('ピカチュウ')
  })

  it('filters by dexNo prefix matching multiple', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: '2',
    })
    expect(result).toHaveLength(3)
    expect(result.map((s) => s.name)).toEqual(['フシギソウ', 'ピカチュウ', 'ライチュウ'])
  })

  it('filters by generation', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      generations: [1],
    })
    expect(result).toHaveLength(species.length)
  })

  it('filters by multiple generations (OR)', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      generations: [2, 3],
    })
    expect(result).toHaveLength(0)
  })

  it('combines search text AND generation filter', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: 'フシギ',
      generations: [1],
    })
    expect(result).toHaveLength(3)
  })

  it('returns empty when no match', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: '存在しないポケモン',
    })
    expect(result).toHaveLength(0)
  })
})

const allForms = Object.values(formsMap).flat()
const getSpeciesFn = (speciesId: number) => species.find((s) => s.id === speciesId)

describe('filterForms', () => {
  it('returns all forms when no filter is applied', () => {
    const result = filterForms(allForms, getSpeciesFn, emptyCondition)
    expect(result).toHaveLength(allForms.length)
  })

  it('filters by species name (partial match)', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      searchText: 'フシギ',
    })
    expect(result).toHaveLength(4)
  })

  it('filters by dexNo (prefix match)', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      searchText: '25',
    })
    expect(result).toHaveLength(3)
  })

  it('filters by generation', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      generations: [7],
    })
    expect(result).toHaveLength(2)
  })

  it('filters by region', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      regions: ['alola'],
    })
    expect(result).toHaveLength(2)
  })

  it('filters by special form - mega', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      specialForms: ['mega'],
    })
    expect(result).toHaveLength(3)
  })

  it('filters by special form - gigantamax', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      specialForms: ['gigantamax'],
    })
    expect(result).toHaveLength(1)
  })

  it('combines generation AND region (AND)', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      generations: [7],
      regions: ['alola'],
    })
    expect(result).toHaveLength(2)
  })

  it('combines search text AND special form (AND)', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      searchText: 'ミュウツー',
      specialForms: ['mega'],
    })
    expect(result).toHaveLength(2)
  })

  it('filters by gender type - male', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      genderTypes: ['male'],
    })
    expect(result).toHaveLength(1)
    expect(result.every((f) => f.genderType === 'male')).toBe(true)
  })

  it('filters by gender type - female', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      genderTypes: ['female'],
    })
    expect(result).toHaveLength(1)
    expect(result.every((f) => f.genderType === 'female')).toBe(true)
  })

  it('filters by gender type - genderless', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      genderTypes: ['genderless'],
    })
    expect(result).toHaveLength(3)
    expect(result.every((f) => f.genderType === 'genderless')).toBe(true)
  })

  it('filters by multiple gender types (OR)', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      genderTypes: ['male', 'genderless'],
    })
    // male(1) + genderless(3) = 4
    expect(result).toHaveLength(4)
  })

  it('does not match both with male or female filter', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      genderTypes: ['male', 'female'],
    })
    // male(1) + female(1) = 2, both は含まない
    expect(result).toHaveLength(2)
  })

  it('combines gender type AND search text', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      searchText: 'ミュウツー',
      genderTypes: ['genderless'],
    })
    expect(result).toHaveLength(3)
  })

  it('returns empty when no match', () => {
    const result = filterForms(allForms, getSpeciesFn, {
      ...emptyCondition,
      searchText: '存在しない',
    })
    expect(result).toHaveLength(0)
  })

  describe('ownership filter', () => {
    const ownedFormIds = new Set([100, 300, 2500])

    it('returns only owned forms when ownershipFilter is owned', () => {
      const result = filterForms(allForms, getSpeciesFn, {
        ...emptyCondition,
        ownershipFilter: ['owned'],
      }, ownedFormIds)
      expect(result).toHaveLength(3)
      expect(result.every((f) => ownedFormIds.has(f.id))).toBe(true)
    })

    it('returns only unowned forms when ownershipFilter is unowned', () => {
      const result = filterForms(allForms, getSpeciesFn, {
        ...emptyCondition,
        ownershipFilter: ['unowned'],
      }, ownedFormIds)
      expect(result).toHaveLength(allForms.length - 3)
      expect(result.every((f) => !ownedFormIds.has(f.id))).toBe(true)
    })

    it('returns all forms when ownershipFilter is empty', () => {
      const result = filterForms(allForms, getSpeciesFn, emptyCondition, ownedFormIds)
      expect(result).toHaveLength(allForms.length)
    })

    it('combines ownership filter with search text', () => {
      const result = filterForms(allForms, getSpeciesFn, {
        ...emptyCondition,
        searchText: 'フシギ',
        ownershipFilter: ['owned'],
      }, ownedFormIds)
      expect(result).toHaveLength(2)
    })

    it('works without ownedFormIds argument (treats all as unowned)', () => {
      const result = filterForms(allForms, getSpeciesFn, {
        ...emptyCondition,
        ownershipFilter: ['owned'],
      })
      expect(result).toHaveLength(0)
    })
  })
})

describe('filterSpecies with ownership', () => {
  const meta = buildSpeciesFilterMeta(species, getFormsFn)
  const ownedFormIds = new Set([100, 300, 301])

  it('returns only fully owned species when ownershipFilter is owned', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      ownershipFilter: ['owned'],
    }, getFormsFn, ownedFormIds)
    // species 1: 1 form [100] → all owned ✓
    // species 3: 2 forms [300, 301] → all owned ✓
    // others: not all owned
    expect(result).toHaveLength(2)
    expect(result.map((s) => s.id)).toEqual([1, 3])
  })

  it('returns only fully unowned species when ownershipFilter is unowned', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      ownershipFilter: ['unowned'],
    }, getFormsFn, ownedFormIds)
    // species 2: 1 form [200], none owned
    // species 25: 3 forms, none owned
    // species 26: 2 forms, none owned
    // species 150: 3 forms, none owned
    expect(result).toHaveLength(4)
    expect(result.map((s) => s.id)).toEqual([2, 25, 26, 150])
  })

  it('returns all species when ownershipFilter is empty', () => {
    const result = filterSpecies(species, meta, emptyCondition, getFormsFn, ownedFormIds)
    expect(result).toHaveLength(species.length)
  })

  it('combines ownership filter with search text', () => {
    const result = filterSpecies(species, meta, {
      ...emptyCondition,
      searchText: 'フシギ',
      ownershipFilter: ['owned'],
    }, getFormsFn, ownedFormIds)
    expect(result).toHaveLength(2)
  })
})
