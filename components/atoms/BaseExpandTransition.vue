<template>
  <v-expand-transition v-bind="$attrs">
    <slot />
  </v-expand-transition>
</template>

<script setup lang="ts">
// v-expand-transition は特別な props を持たないため、
// $attrs で全ての属性を透過的に渡す
</script>
