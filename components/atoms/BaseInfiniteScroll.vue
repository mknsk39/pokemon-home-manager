<template>
  <v-infinite-scroll
    :mode="mode"
    :side="side"
    :height="height"
    :max-height="maxHeight"
    :empty-text="emptyText"
    v-bind="$attrs"
    @load="$emit('load', $event)"
  >
    <slot />

    <template #loading="slotProps">
      <slot name="loading" v-bind="slotProps" />
    </template>

    <template #empty="slotProps">
      <slot name="empty" v-bind="slotProps" />
    </template>
  </v-infinite-scroll>
</template>

<script lang="ts">
export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'
</script>

<script setup lang="ts">
interface Props {
  mode?: 'intersect' | 'manual'
  side?: InfiniteScrollSide
  height?: string | number
  maxHeight?: string | number
  emptyText?: string
}

withDefaults(defineProps<Props>(), {
  mode: 'intersect',
  side: 'end',
  height: undefined,
  maxHeight: undefined,
  emptyText: undefined,
})

defineEmits<{
  load: [options: { side: InfiniteScrollSide; done: (status: InfiniteScrollStatus) => void }]
}>()
</script>
