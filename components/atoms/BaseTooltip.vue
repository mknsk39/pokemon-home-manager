<template>
  <v-tooltip
    :text="text"
    :location="location"
    v-bind="$attrs"
  >
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  location?: 'top' | 'bottom' | 'start' | 'end'
}

withDefaults(defineProps<Props>(), {
  text: undefined,
  location: 'bottom',
})
</script>
