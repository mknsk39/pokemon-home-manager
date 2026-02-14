<template>
  <PokemonListView
    :items="visibleItems"
    :filtered-count="isFilterActive ? filteredItems.length : undefined"
    :total-count="isFilterActive ? totalCount : undefined"
    :clickable="viewMode === 'forms'"
    @load="onLoad"
    @card-click="onCardClick"
  >
    <template #header-actions>
      <BaseBtnToggle
        :model-value="viewMode"
        mandatory
        @update:model-value="onViewModeChange"
      >
        <BaseButton value="species" variant="text">種別</BaseButton>
        <BaseButton value="forms" variant="text">すがた</BaseButton>
      </BaseBtnToggle>
    </template>
    <template #toolbar>
      <PokemonSearchFilter
        :search-text="searchText"
        :generations="generations"
        :regions="regions"
        :special-forms="specialForms"
        :gender-types="genderTypes"
        :ownership-filter="ownershipFilter"
        :is-filter-active="isFilterActive"
        :show-form-filters="viewMode === 'forms'"
        :show-ownership-filter="isLoggedIn"
        @update:search-text="searchText = $event"
        @update:generations="generations = $event"
        @update:regions="regions = $event"
        @update:special-forms="specialForms = $event"
        @update:gender-types="genderTypes = $event"
        @update:ownership-filter="ownershipFilter = $event"
        @reset="resetFilters"
      />
    </template>
  </PokemonListView>
</template>

<script setup lang="ts">
import type { InfiniteScrollStatus } from '../components/atoms/BaseInfiniteScroll.vue'

type ViewMode = 'species' | 'forms'

const CHUNK_SIZE = 50

const masterData = useMasterData()
const authStore = useAuthStore()
const ownershipStore = useOwnershipStore()
const { ownedFormIds } = storeToRefs(ownershipStore)

const isLoggedIn = computed(() => !!authStore.user)

const {
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
} = usePokemonFilter(masterData, ownedFormIds)

const viewMode = ref<ViewMode>('species')
const displayCount = ref(CHUNK_SIZE)

const filteredItems = computed(() => {
  if (viewMode.value === 'species') {
    return filteredSpecies.value.map((species) => {
      const { owned, total } = ownershipStore.getOwnedCountForSpecies(
        () => masterData.listForms(species.id),
      )
      return {
        id: species.id,
        dexNo: species.dexNo,
        name: species.name,
        owned: total > 0 && owned === total,
        ownedCount: owned,
        totalFormCount: total,
      }
    })
  }
  return filteredForms.value.map((form) => {
    const species = masterData.getSpecies(form.speciesId)
    return {
      id: form.id,
      dexNo: species?.dexNo ?? 0,
      name: species?.name ?? '',
      formName: form.formName || undefined,
      owned: ownershipStore.isOwned(form.id),
    }
  })
})

const totalCount = computed(() => {
  if (viewMode.value === 'species') {
    return masterData.listSpecies().length
  }
  return masterData.listAllForms().length
})

const visibleItems = computed(() => filteredItems.value.slice(0, displayCount.value))

const onViewModeChange = (value: string | number) => {
  viewMode.value = value as ViewMode
  displayCount.value = CHUNK_SIZE
}

watch([searchText, generations, regions, specialForms, genderTypes, ownershipFilter], () => {
  displayCount.value = CHUNK_SIZE
})

// eslint-disable-next-line no-unused-vars
const onLoad = ({ done }: { side: string; done: (status: InfiniteScrollStatus) => void }) => {
  if (displayCount.value >= filteredItems.value.length) {
    done('empty')
    return
  }
  displayCount.value = Math.min(displayCount.value + CHUNK_SIZE, filteredItems.value.length)
  done(displayCount.value >= filteredItems.value.length ? 'empty' : 'ok')
}

const onCardClick = (formId: number) => {
  if (viewMode.value === 'forms') {
    ownershipStore.toggleOwnership(formId)
  }
}
</script>
