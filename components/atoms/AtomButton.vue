<template>
  <v-btn
    :color="color"
    :size="size"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    v-bind="$attrs"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  prependIcon?: string
  appendIcon?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'default',
  prependIcon: undefined,
  appendIcon: undefined,
})
</script>
