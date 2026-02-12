<template>
  <BaseCard
    class="pokemon-card"
    elevation="6"
    rounded="lg"
  >
    <div class="pokemon-card__inner">
      <BaseIcon icon="mdi-pokeball" size="20" class="mr-2" />
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
        <span v-else class="pokemon-card__form-name" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../atoms/BaseCard.vue'
import BaseIcon from '../atoms/BaseIcon.vue'
import BaseTooltip from '../atoms/BaseTooltip.vue'

interface Props {
  dexNo: number
  name: string
  formName?: string
}

withDefaults(defineProps<Props>(), {
  formName: undefined,
})
</script>

<style scoped>
.pokemon-card {
  background: rgba(255, 255, 255, 0.04);
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
