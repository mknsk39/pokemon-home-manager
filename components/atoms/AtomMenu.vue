<template>
  <v-menu v-model="model" :location="componentProps.location" v-bind="$attrs">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>
    <slot />
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Anchor } from 'vuetify';

interface Props {
  modelValue?: boolean
  location?: Anchor
}

const componentProps = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  location: 'bottom end',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const model = computed({
  get: () => componentProps.modelValue ?? false,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>
