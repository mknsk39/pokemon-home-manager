<template>
  <v-card
    :color="color"
    :elevation="elevation"
    :rounded="rounded"
    v-bind="$attrs"
  >
    <slot />
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  elevation?: string | number
  rounded?: string | boolean
}

withDefaults(defineProps<Props>(), {
  color: 'surface',
  elevation: 8,
  rounded: 'lg',
})
</script>
