<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    class="donut-chart"
  >
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="none"
      :stroke="trackColor"
      :stroke-width="strokeWidth"
    />
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="none"
      :stroke="color"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
      class="donut-chart__progress"
    />
    <text
      :x="center"
      :y="center"
      text-anchor="middle"
      dominant-baseline="central"
      class="donut-chart__label"
    >
      {{ percentage }}%
    </text>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  strokeWidth: 20,
  color: 'rgb(var(--v-theme-primary))',
  trackColor: 'rgba(255, 255, 255, 0.1)',
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => {
  const progress = Math.min(Math.max(props.percentage, 0), 100) / 100
  return circumference.value * (1 - progress)
})
</script>

<style scoped>
.donut-chart {
  transform: rotate(-90deg);
}

.donut-chart__progress {
  transition: stroke-dashoffset 0.6s ease;
}

.donut-chart__label {
  transform: rotate(90deg);
  transform-origin: center;
  fill: currentColor;
  font-size: 2rem;
  font-weight: bold;
}
</style>
