<template>
  <v-chip-group
    :model-value="modelValue"
    :multiple="multiple"
    :column="column"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </v-chip-group>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: (string | number)[] | string | number
  multiple?: boolean
  column?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  multiple: false,
  column: false,
})

defineEmits<{
  'update:modelValue': [value: (string | number)[] | string | number]
}>()
</script>
