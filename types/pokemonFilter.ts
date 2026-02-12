import type { Region } from './masterData'

export type SpecialFormType = 'mega' | 'gigantamax' | 'primal'

export type GenderFilterType = 'male' | 'female' | 'genderless'

export type PokemonFilterCondition = {
  searchText: string
  generations: number[]
  regions: Region[]
  specialForms: SpecialFormType[]
  genderTypes: GenderFilterType[]
}

export type SpeciesFilterMeta = {
  speciesId: number
  generation: number
  regions: Region[]
  hasMega: boolean
  hasGigantamax: boolean
  hasPrimal: boolean
}
