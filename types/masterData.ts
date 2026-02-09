export type GenderType = 'male' | 'female' | 'genderless' | 'both'

export type Region = 'alola' | 'galar' | 'hisui' | 'paldea'

export type PokemonSpecies = {
  id: number
  dexNo: number
  name: string
}

export type PokemonForm = {
  id: number
  speciesId: number
  formIndex: number
  formName: string
  imageUrl: string
  generation: number
  genderType: GenderType
  region?: Region
  isDefault: boolean
  isMega: boolean
  isGigantamax: boolean
  isPrimal: boolean
}
