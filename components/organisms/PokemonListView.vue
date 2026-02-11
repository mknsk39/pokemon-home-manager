<template>
  <BaseContainer class="pokemon-list">
    <header class="pokemon-list__header">
      <BaseIcon icon="mdi-pokeball" size="28" class="mr-2" />
      <h1 class="text-h5 font-weight-bold">
        {{ title }}
      </h1>
    </header>

    <p v-if="items.length === 0" class="text-body-2 text-medium-emphasis">
      {{ emptyText }}
    </p>

    <BaseInfiniteScroll
      v-else
      @load="$emit('load', $event)"
    >
      <div class="pokemon-list__grid">
        <BaseCard
          v-for="item in items"
          :key="item.id"
          class="pokemon-list__card"
          elevation="6"
          rounded="lg"
        >
          <div class="pokemon-list__card-inner">
            <BaseIcon icon="mdi-pokeball" size="20" class="mr-2" />
            <div class="pokemon-list__meta">
              <span class="text-caption text-medium-emphasis">
                No.{{ item.dexNo }}
              </span>
              <span class="text-body-1 font-weight-medium">
                {{ item.name }}
              </span>
            </div>
          </div>
        </BaseCard>
      </div>
    </BaseInfiniteScroll>

    <Transition name="scroll-top-fab">
      <BaseButton
        v-show="isVisible"
        :icon="true"
        size="large"
        color="primary"
        class="scroll-top-fab"
        aria-label="ページの先頭に戻る"
        @click="scrollToTop"
      >
        <BaseIcon icon="mdi-arrow-up" color="white" />
      </BaseButton>
    </Transition>
  </BaseContainer>
</template>

<script setup lang="ts">
import { useScrollToTop } from '../../composables/useScrollToTop'
import BaseButton from '../atoms/BaseButton.vue'
import BaseCard from '../atoms/BaseCard.vue'
import BaseContainer from '../atoms/BaseContainer.vue'
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseInfiniteScroll, {
  type InfiniteScrollSide,
  type InfiniteScrollStatus,
} from '../atoms/BaseInfiniteScroll.vue'

type PokemonListItem = {
  id: number
  dexNo: number
  name: string
}

interface Props {
  items: PokemonListItem[]
  title?: string
  emptyText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'ポケモン一覧',
  emptyText: '表示できるポケモンがありません。',
})

const { isVisible, scrollToTop } = useScrollToTop()

defineEmits<{
  // eslint-disable-next-line no-unused-vars
  load: [options: { side: InfiniteScrollSide; done: (status: InfiniteScrollStatus) => void }]
}>()
</script>

<style scoped>
.pokemon-list {
  padding-top: 24px;
  padding-bottom: 32px;
}

.pokemon-list__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.pokemon-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 12px;
}

.pokemon-list__card {
  background: rgba(255, 255, 255, 0.04);
}

.pokemon-list__card-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.pokemon-list__meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.pokemon-list__meta .text-body-1 {
  white-space: nowrap;
}

.scroll-top-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
}

.scroll-top-fab-enter-active,
.scroll-top-fab-leave-active {
  transition: opacity 0.3s ease;
}

.scroll-top-fab-enter-from,
.scroll-top-fab-leave-to {
  opacity: 0;
}
</style>
