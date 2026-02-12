<template>
  <v-btn-toggle
    :model-value="modelValue"
    :mandatory="mandatory"
    :color="color"
    :variant="variant"
    :density="density"
    :divided="divided"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </v-btn-toggle>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  mandatory?: boolean
  color?: string
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  density?: 'default' | 'comfortable' | 'compact'
  divided?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  mandatory: false,
  color: 'primary',
  variant: 'outlined',
  density: 'compact',
  divided: true,
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
