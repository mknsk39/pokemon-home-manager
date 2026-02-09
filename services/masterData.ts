import type { PokemonForm, PokemonSpecies } from '../types/masterData'

// Vite/Nuxt can import JSON directly.
import speciesJson from '../constants/master/pokemonSpecies.json'
import formsJson from '../constants/master/pokemonForms.json'

/* eslint-disable no-unused-vars -- type-only parameter names in TS interfaces should not be linted */
export interface MasterDataService {
  listSpecies(): PokemonSpecies[]
  getSpecies(id: number): PokemonSpecies | undefined
  listForms(speciesId: number): PokemonForm[]
  getForm(id: number): PokemonForm | undefined
}
/* eslint-enable no-unused-vars */

export const createMasterDataService = (): MasterDataService => {
  const species = (speciesJson as PokemonSpecies[]).slice().sort((a, b) => a.id - b.id)
  const forms = (formsJson as PokemonForm[]).slice().sort((a, b) => a.id - b.id)

  const speciesById = new Map<number, PokemonSpecies>()
  for (const item of species) {
    speciesById.set(item.id, item)
  }

  const formsById = new Map<number, PokemonForm>()
  const formsBySpeciesId = new Map<number, PokemonForm[]>()
  for (const form of forms) {
    formsById.set(form.id, form)
    const list = formsBySpeciesId.get(form.speciesId)
    if (list) {
      list.push(form)
    } else {
      formsBySpeciesId.set(form.speciesId, [form])
    }
  }

  for (const list of formsBySpeciesId.values()) {
    list.sort((a, b) => a.id - b.id)
  }

  return {
    listSpecies: () => species,
    getSpecies: (id) => speciesById.get(id),
    listForms: (speciesId) => formsBySpeciesId.get(speciesId) ?? [],
    getForm: (id) => formsById.get(id),
  }
}
