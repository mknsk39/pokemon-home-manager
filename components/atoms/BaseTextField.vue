<template>
  <v-text-field
    :model-value="modelValue"
    :placeholder="placeholder"
    :prepend-inner-icon="prependInnerIcon"
    :clearable="clearable"
    :hide-details="hideDetails"
    :density="density"
    :variant="variant"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  prependInnerIcon?: string
  clearable?: boolean
  hideDetails?: boolean | 'auto'
  density?: 'default' | 'comfortable' | 'compact'
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: undefined,
  prependInnerIcon: undefined,
  clearable: false,
  hideDetails: false,
  density: 'default',
  variant: 'outlined',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
