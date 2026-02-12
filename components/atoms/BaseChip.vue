<template>
  <v-chip
    :value="value"
    :color="color"
    :variant="variant"
    :filter="filter"
    :size="size"
    v-bind="$attrs"
  >
    <slot />
  </v-chip>
</template>

<script setup lang="ts">
interface Props {
  value?: string | number
  color?: string
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  filter?: boolean
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
}

withDefaults(defineProps<Props>(), {
  value: undefined,
  color: 'primary',
  variant: 'tonal',
  filter: false,
  size: 'default',
})
</script>
