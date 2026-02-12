<template>
  <BaseContainer class="pokemon-list">
    <header class="pokemon-list__header">
      <div class="pokemon-list__header-title">
        <BaseIcon icon="mdi-pokeball" size="28" class="mr-2" />
        <h1 class="text-h5 font-weight-bold">
          {{ title }}
        </h1>
      </div>
      <div v-if="$slots['header-actions']" class="pokemon-list__header-actions">
        <slot name="header-actions" />
      </div>
    </header>

    <div v-if="$slots.toolbar" class="pokemon-list__toolbar">
      <slot name="toolbar" />
    </div>

    <p v-if="filteredCount !== undefined && totalCount !== undefined" class="text-body-2 text-medium-emphasis pokemon-list__count">
      全{{ totalCount }}件中 {{ filteredCount }}件表示
    </p>

    <p v-if="items.length === 0" class="text-body-2 text-medium-emphasis">
      {{ emptyText }}
    </p>

    <BaseInfiniteScroll
      v-else
      @load="$emit('load', $event)"
    >
      <div class="pokemon-list__grid">
        <PokemonCard
          v-for="item in items"
          :key="item.id"
          :dex-no="item.dexNo"
          :name="item.name"
          :form-name="item.formName"
          :owned="item.owned"
          :owned-count="item.ownedCount"
          :total-form-count="item.totalFormCount"
          :clickable="clickable"
          @click="$emit('card-click', item.id)"
        />
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
import type { PokemonListItem } from '../../types/pokemon'
import { useScrollToTop } from '../../composables/useScrollToTop'
import BaseButton from '../atoms/BaseButton.vue'
import BaseContainer from '../atoms/BaseContainer.vue'
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseInfiniteScroll, {
  type InfiniteScrollSide,
  type InfiniteScrollStatus,
} from '../atoms/BaseInfiniteScroll.vue'
import PokemonCard from '../molecules/PokemonCard.vue'

interface Props {
  items: PokemonListItem[]
  title?: string
  emptyText?: string
  filteredCount?: number
  totalCount?: number
  clickable?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'ポケモン一覧',
  emptyText: '表示できるポケモンがありません。',
  filteredCount: undefined,
  totalCount: undefined,
  clickable: false,
})

const { isVisible, scrollToTop } = useScrollToTop()

defineEmits<{
  // eslint-disable-next-line no-unused-vars
  load: [options: { side: InfiniteScrollSide; done: (status: InfiniteScrollStatus) => void }]
  'card-click': [formId: number]
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.pokemon-list__header-title {
  display: flex;
  align-items: center;
}

.pokemon-list__header-actions {
  display: flex;
  align-items: center;
}

.pokemon-list__toolbar {
  margin-bottom: 12px;
}

.pokemon-list__count {
  margin-bottom: 8px;
}

.pokemon-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  gap: 12px;
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
