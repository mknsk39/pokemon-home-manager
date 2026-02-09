<template>
  <v-icon :icon="icon" :size="size" :color="color" v-bind="$attrs" />
</template>

<script setup lang="ts">
interface Props {
  icon: string
  size?: string | number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'primary',
})
</script>
