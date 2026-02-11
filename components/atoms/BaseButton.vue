<template>
  <v-btn
    :color="color"
    :size="size"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :variant="variant"
    :block="block"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
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
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: boolean | string
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'default',
  prependIcon: undefined,
  appendIcon: undefined,
  variant: undefined,
  block: false,
  disabled: false,
  loading: false,
  icon: undefined,
})
</script>
