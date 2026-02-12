<template>
  <PokemonListView :items="visibleItems" @load="onLoad">
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
  </PokemonListView>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseBtnToggle from '../components/atoms/BaseBtnToggle.vue'
import BaseButton from '../components/atoms/BaseButton.vue'
import type { InfiniteScrollStatus } from '../components/atoms/BaseInfiniteScroll.vue'
import PokemonListView from '../components/organisms/PokemonListView.vue'
import { useMasterData } from '../composables/useMasterData'

type ViewMode = 'species' | 'forms'

const CHUNK_SIZE = 50

const masterData = useMasterData()

const speciesItems = masterData.listSpecies().map((species) => ({
  id: species.id,
  dexNo: species.dexNo,
  name: species.name,
}))

const formItems = masterData.listAllForms().map((form) => {
  const species = masterData.getSpecies(form.speciesId)
  return {
    id: form.id,
    dexNo: species?.dexNo ?? 0,
    name: species?.name ?? '',
    formName: form.formName || undefined,
  }
})

const viewMode = ref<ViewMode>('species')
const displayCount = ref(CHUNK_SIZE)

const allItems = computed(() =>
  viewMode.value === 'species' ? speciesItems : formItems,
)

const visibleItems = computed(() => allItems.value.slice(0, displayCount.value))

const onViewModeChange = (value: string | number) => {
  viewMode.value = value as ViewMode
  displayCount.value = CHUNK_SIZE
}

// eslint-disable-next-line no-unused-vars
const onLoad = ({ done }: { side: string; done: (status: InfiniteScrollStatus) => void }) => {
  if (displayCount.value >= allItems.value.length) {
    done('empty')
    return
  }
  displayCount.value = Math.min(displayCount.value + CHUNK_SIZE, allItems.value.length)
  done(displayCount.value >= allItems.value.length ? 'empty' : 'ok')
}
</script>
