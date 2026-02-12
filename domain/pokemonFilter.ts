import type { PokemonForm, PokemonSpecies, Region } from '../types/masterData'
import type { GenderFilterType, PokemonFilterCondition, SpecialFormType, SpeciesFilterMeta } from '../types/pokemonFilter'

export const buildSpeciesFilterMeta = (
  species: PokemonSpecies[],
  // eslint-disable-next-line no-unused-vars
  getFormsFn: (speciesId: number) => PokemonForm[],
): Map<number, SpeciesFilterMeta> => {
  const meta = new Map<number, SpeciesFilterMeta>()

  for (const sp of species) {
    const forms = getFormsFn(sp.id)
    const defaultForm = forms.find((f) => f.isDefault)

    const regions: Region[] = []
    let hasMega = false
    let hasGigantamax = false
    let hasPrimal = false

    for (const form of forms) {
      if (form.region && !regions.includes(form.region)) {
        regions.push(form.region)
      }
      if (form.isMega) hasMega = true
      if (form.isGigantamax) hasGigantamax = true
      if (form.isPrimal) hasPrimal = true
    }

    meta.set(sp.id, {
      speciesId: sp.id,
      generation: defaultForm?.generation ?? forms[0]?.generation ?? 0,
      regions,
      hasMega,
      hasGigantamax,
      hasPrimal,
    })
  }

  return meta
}

export const filterSpecies = (
  species: PokemonSpecies[],
  meta: Map<number, SpeciesFilterMeta>,
  condition: PokemonFilterCondition,
  // eslint-disable-next-line no-unused-vars
  getFormsFn?: (speciesId: number) => PokemonForm[],
  ownedFormIds?: Set<number>,
): PokemonSpecies[] => {
  const { searchText, generations, ownershipFilter } = condition
  const trimmedSearch = searchText.trim()

  return species.filter((sp) => {
    if (trimmedSearch) {
      const matchesName = sp.name.includes(trimmedSearch)
      const matchesDexNo = String(sp.dexNo).startsWith(trimmedSearch)
      if (!matchesName && !matchesDexNo) return false
    }

    const m = meta.get(sp.id)
    if (!m) return false

    if (generations.length > 0 && !generations.includes(m.generation)) {
      return false
    }

    if (ownershipFilter.length > 0 && getFormsFn && ownedFormIds) {
      const forms = getFormsFn(sp.id)
      const ownedCount = forms.filter((f) => ownedFormIds.has(f.id)).length
      const totalCount = forms.length

      if (ownershipFilter.includes('owned') && !ownershipFilter.includes('unowned')) {
        if (ownedCount !== totalCount) return false
      }
      if (ownershipFilter.includes('unowned') && !ownershipFilter.includes('owned')) {
        if (ownedCount !== 0) return false
      }
    }

    return true
  })
}

const matchesSpecialForm = (form: PokemonForm, types: SpecialFormType[]): boolean =>
  types.some((type) => {
    if (type === 'mega') return form.isMega
    if (type === 'gigantamax') return form.isGigantamax
    if (type === 'primal') return form.isPrimal
    return false
  })

const matchesGenderFilter = (form: PokemonForm, genderTypes: GenderFilterType[]): boolean =>
  genderTypes.includes(form.genderType as GenderFilterType)

export const filterForms = (
  forms: PokemonForm[],
  // eslint-disable-next-line no-unused-vars
  getSpeciesFn: (speciesId: number) => PokemonSpecies | undefined,
  condition: PokemonFilterCondition,
  ownedFormIds?: Set<number>,
): PokemonForm[] => {
  const { searchText, generations, regions, specialForms, genderTypes, ownershipFilter } = condition
  const trimmedSearch = searchText.trim()

  return forms.filter((form) => {
    if (trimmedSearch) {
      const species = getSpeciesFn(form.speciesId)
      if (!species) return false
      const matchesName = species.name.includes(trimmedSearch)
      const matchesDexNo = String(species.dexNo).startsWith(trimmedSearch)
      if (!matchesName && !matchesDexNo) return false
    }

    if (generations.length > 0 && !generations.includes(form.generation)) {
      return false
    }

    if (regions.length > 0) {
      if (!form.region || !regions.includes(form.region)) return false
    }

    if (specialForms.length > 0 && !matchesSpecialForm(form, specialForms)) {
      return false
    }

    if (genderTypes.length > 0 && !matchesGenderFilter(form, genderTypes)) {
      return false
    }

    if (ownershipFilter.length > 0) {
      const ids = ownedFormIds ?? new Set<number>()
      const isOwned = ids.has(form.id)

      if (ownershipFilter.includes('owned') && !ownershipFilter.includes('unowned')) {
        if (!isOwned) return false
      }
      if (ownershipFilter.includes('unowned') && !ownershipFilter.includes('owned')) {
        if (isOwned) return false
      }
    }

    return true
  })
}
