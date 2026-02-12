import { computed, ref, type Ref } from 'vue'
import { buildSpeciesFilterMeta, filterForms, filterSpecies } from '../domain/pokemonFilter'
import type { MasterDataService } from '../services/masterData'
import type { Region } from '../types/masterData'
import type { GenderFilterType, SpecialFormType } from '../types/pokemonFilter'
import type { OwnershipFilterType } from '../types/ownership'

export const usePokemonFilter = (
  masterData: MasterDataService,
  ownedFormIds?: Ref<Set<number>>,
) => {
  const allSpecies = masterData.listSpecies()
  const allForms = masterData.listAllForms()
  const meta = buildSpeciesFilterMeta(allSpecies, (id) => masterData.listForms(id))

  const searchText = ref('')
  const generations = ref<number[]>([])
  const regions = ref<Region[]>([])
  const specialForms = ref<SpecialFormType[]>([])
  const genderTypes = ref<GenderFilterType[]>([])
  const ownershipFilter = ref<OwnershipFilterType[]>([])

  const isFilterActive = computed(
    () =>
      searchText.value.trim() !== '' ||
      generations.value.length > 0 ||
      regions.value.length > 0 ||
      specialForms.value.length > 0 ||
      genderTypes.value.length > 0 ||
      ownershipFilter.value.length > 0,
  )

  const filteredSpecies = computed(() =>
    filterSpecies(
      allSpecies,
      meta,
      {
        searchText: searchText.value,
        generations: generations.value,
        regions: regions.value,
        specialForms: specialForms.value,
        genderTypes: genderTypes.value,
        ownershipFilter: ownershipFilter.value,
      },
      (id) => masterData.listForms(id),
      ownedFormIds?.value,
    ),
  )

  const filteredForms = computed(() =>
    filterForms(
      allForms,
      (id) => masterData.getSpecies(id),
      {
        searchText: searchText.value,
        generations: generations.value,
        regions: regions.value,
        specialForms: specialForms.value,
        genderTypes: genderTypes.value,
        ownershipFilter: ownershipFilter.value,
      },
      ownedFormIds?.value,
    ),
  )

  const resetFilters = () => {
    searchText.value = ''
    generations.value = []
    regions.value = []
    specialForms.value = []
    genderTypes.value = []
    ownershipFilter.value = []
  }

  return {
    searchText,
    generations,
    regions,
    specialForms,
    genderTypes,
    ownershipFilter,
    isFilterActive,
    filteredSpecies,
    filteredForms,
    resetFilters,
  }
}
