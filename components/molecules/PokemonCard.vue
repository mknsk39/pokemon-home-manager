<template>
  <BaseCard
    class="pokemon-card"
    :class="{
      'pokemon-card--owned': owned,
      'pokemon-card--clickable': clickable,
    }"
    elevation="6"
    rounded="lg"
    @click="clickable ? $emit('click') : undefined"
  >
    <div class="pokemon-card__inner">
      <BaseIcon
        icon="mdi-pokeball"
        size="20"
        class="mr-2"
        :color="iconColor"
      />
      <div class="pokemon-card__meta">
        <span class="text-caption text-medium-emphasis">
          No.{{ dexNo }}
        </span>
        <span class="text-body-1 font-weight-medium">
          {{ name }}
        </span>
        <BaseTooltip v-if="formName" :text="formName">
          <template #activator="{ props: tooltipProps }">
            <span v-bind="tooltipProps" class="pokemon-card__form-name text-caption text-medium-emphasis">
              {{ formName }}
            </span>
          </template>
        </BaseTooltip>
        <span v-else-if="ownershipLabel" class="pokemon-card__form-name text-caption text-medium-emphasis">
          {{ ownershipLabel }}
        </span>
        <span v-else class="pokemon-card__form-name" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
interface Props {
  dexNo: number
  name: string
  formName?: string
  owned?: boolean
  ownedCount?: number
  totalFormCount?: number
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  formName: undefined,
  owned: undefined,
  ownedCount: undefined,
  totalFormCount: undefined,
  clickable: false,
})

defineEmits<{
  click: []
}>()

const iconColor = computed(() => {
  if (props.owned === true) return 'primary'
  if (props.owned === false) return 'grey-lighten-1'
  return undefined // default (BaseIcon の primary)
})

const ownershipLabel = computed(() => {
  if (props.ownedCount !== undefined && props.totalFormCount !== undefined) {
    return `${props.ownedCount}/${props.totalFormCount}`
  }
  return undefined
})
</script>

<style scoped>
.pokemon-card {
  border-left: 4px solid transparent;
  transition: border-color 0.2s ease;
}

.pokemon-card--clickable {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease;
}

.pokemon-card--clickable:hover {
  transform: translateY(-2px);
}

.pokemon-card--owned {
  border-left-color: rgb(var(--v-theme-primary));
}

.pokemon-card__inner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.pokemon-card__meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.pokemon-card__meta .text-body-1 {
  white-space: nowrap;
}

.pokemon-card__form-name {
  min-height: 1.25rem;
  line-height: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
