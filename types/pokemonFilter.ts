import type { Region } from './masterData'
import type { OwnershipFilterType } from './ownership'

export type SpecialFormType = 'mega' | 'gigantamax' | 'primal'

export type GenderFilterType = 'male' | 'female' | 'genderless'

export type PokemonFilterCondition = {
  searchText: string
  generations: number[]
  regions: Region[]
  specialForms: SpecialFormType[]
  genderTypes: GenderFilterType[]
  ownershipFilter: OwnershipFilterType[]
}

export type SpeciesFilterMeta = {
  speciesId: number
  generation: number
  regions: Region[]
  hasMega: boolean
  hasGigantamax: boolean
  hasPrimal: boolean
}
