import { computed, ref } from 'vue'
import { buildSpeciesFilterMeta, filterForms, filterSpecies } from '../domain/pokemonFilter'
import type { MasterDataService } from '../services/masterData'
import type { Region } from '../types/masterData'
import type { GenderFilterType, SpecialFormType } from '../types/pokemonFilter'

export const usePokemonFilter = (masterData: MasterDataService) => {
  const allSpecies = masterData.listSpecies()
  const allForms = masterData.listAllForms()
  const meta = buildSpeciesFilterMeta(allSpecies, (id) => masterData.listForms(id))

  const searchText = ref('')
  const generations = ref<number[]>([])
  const regions = ref<Region[]>([])
  const specialForms = ref<SpecialFormType[]>([])
  const genderTypes = ref<GenderFilterType[]>([])

  const isFilterActive = computed(
    () =>
      searchText.value.trim() !== '' ||
      generations.value.length > 0 ||
      regions.value.length > 0 ||
      specialForms.value.length > 0 ||
      genderTypes.value.length > 0,
  )

  const filteredSpecies = computed(() =>
    filterSpecies(allSpecies, meta, {
      searchText: searchText.value,
      generations: generations.value,
      regions: regions.value,
      specialForms: specialForms.value,
      genderTypes: genderTypes.value,
    }),
  )

  const filteredForms = computed(() =>
    filterForms(allForms, (id) => masterData.getSpecies(id), {
      searchText: searchText.value,
      generations: generations.value,
      regions: regions.value,
      specialForms: specialForms.value,
      genderTypes: genderTypes.value,
    }),
  )

  const resetFilters = () => {
    searchText.value = ''
    generations.value = []
    regions.value = []
    specialForms.value = []
    genderTypes.value = []
  }

  return {
    searchText,
    generations,
    regions,
    specialForms,
    genderTypes,
    isFilterActive,
    filteredSpecies,
    filteredForms,
    resetFilters,
  }
}
