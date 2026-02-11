<template>
  <PokemonListView :items="visibleItems" @load="onLoad" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InfiniteScrollStatus } from '../components/atoms/BaseInfiniteScroll.vue'
import PokemonListView from '../components/organisms/PokemonListView.vue'
import { useMasterData } from '../composables/useMasterData'

const CHUNK_SIZE = 50

const masterData = useMasterData()
const allItems = masterData.listSpecies().map((species) => ({
  id: species.id,
  dexNo: species.dexNo,
  name: species.name,
}))

const displayCount = ref(CHUNK_SIZE)

const visibleItems = computed(() => allItems.slice(0, displayCount.value))

// eslint-disable-next-line no-unused-vars
const onLoad = ({ done }: { side: string; done: (status: InfiniteScrollStatus) => void }) => {
  if (displayCount.value >= allItems.length) {
    done('empty')
    return
  }
  displayCount.value = Math.min(displayCount.value + CHUNK_SIZE, allItems.length)
  done(displayCount.value >= allItems.length ? 'empty' : 'ok')
}
</script>
