<template>
  <div class="pokemon-search-filter">
    <div class="pokemon-search-filter__bar">
      <BaseTextField
        :model-value="searchText"
        placeholder="名前 または 図鑑No. で検索..."
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        density="compact"
        class="pokemon-search-filter__input"
        @update:model-value="$emit('update:searchText', $event ?? '')"
      />
      <BaseButton
        :variant="isFilterActive ? 'flat' : 'outlined'"
        :color="isFilterActive ? 'primary' : undefined"
        size="small"
        prepend-icon="mdi-filter-variant"
        @click="showPanel = !showPanel"
      >
        フィルター
      </BaseButton>
    </div>

    <BaseExpandTransition>
      <div v-show="showPanel" class="pokemon-search-filter__panel">
        <div class="pokemon-search-filter__section">
          <span class="text-caption font-weight-bold">世代</span>
          <BaseChipGroup
            :model-value="generations"
            multiple
            column
            @update:model-value="$emit('update:generations', $event as number[])"
          >
            <BaseChip v-for="gen in 9" :key="gen" :value="gen" filter size="small">
              {{ gen }}
            </BaseChip>
          </BaseChipGroup>
        </div>

        <div v-if="showFormFilters" class="pokemon-search-filter__section">
          <span class="text-caption font-weight-bold">リージョン</span>
          <BaseChipGroup
            :model-value="regions"
            multiple
            column
            @update:model-value="$emit('update:regions', $event as Region[])"
          >
            <BaseChip
              v-for="region in regionOptions"
              :key="region.value"
              :value="region.value"
              filter
              size="small"
            >
              {{ region.label }}
            </BaseChip>
          </BaseChipGroup>
        </div>

        <div v-if="showFormFilters" class="pokemon-search-filter__section">
          <span class="text-caption font-weight-bold">特殊フォーム</span>
          <BaseChipGroup
            :model-value="specialForms"
            multiple
            column
            @update:model-value="$emit('update:specialForms', $event as SpecialFormType[])"
          >
            <BaseChip
              v-for="form in specialFormOptions"
              :key="form.value"
              :value="form.value"
              filter
              size="small"
            >
              {{ form.label }}
            </BaseChip>
          </BaseChipGroup>
        </div>

        <div v-if="showFormFilters" class="pokemon-search-filter__section">
          <span class="text-caption font-weight-bold">せいべつ</span>
          <BaseChipGroup
            :model-value="genderTypes"
            multiple
            column
            @update:model-value="$emit('update:genderTypes', $event as GenderFilterType[])"
          >
            <BaseChip
              v-for="gender in genderOptions"
              :key="gender.value"
              :value="gender.value"
              filter
              size="small"
            >
              {{ gender.label }}
            </BaseChip>
          </BaseChipGroup>
        </div>

        <div v-if="showOwnershipFilter" class="pokemon-search-filter__section">
          <span class="text-caption font-weight-bold">所持状態</span>
          <BaseChipGroup
            :model-value="ownershipFilter"
            multiple
            column
            @update:model-value="$emit('update:ownershipFilter', $event as OwnershipFilterType[])"
          >
            <BaseChip
              v-for="option in ownershipOptions"
              :key="option.value"
              :value="option.value"
              filter
              size="small"
            >
              {{ option.label }}
            </BaseChip>
          </BaseChipGroup>
        </div>

        <div class="pokemon-search-filter__actions">
          <BaseButton
            variant="text"
            size="small"
            prepend-icon="mdi-refresh"
            @click="$emit('reset')"
          >
            フィルターをリセット
          </BaseButton>
        </div>
      </div>
    </BaseExpandTransition>
  </div>
</template>

<script setup lang="ts">
import type { Region } from '../../types/masterData'
import type { GenderFilterType, SpecialFormType } from '../../types/pokemonFilter'
import type { OwnershipFilterType } from '../../types/ownership'

interface Props {
  searchText: string
  generations: number[]
  regions: Region[]
  specialForms: SpecialFormType[]
  genderTypes: GenderFilterType[]
  ownershipFilter: OwnershipFilterType[]
  isFilterActive: boolean
  showFormFilters?: boolean
  showOwnershipFilter?: boolean
}

withDefaults(defineProps<Props>(), {
  showFormFilters: false,
  showOwnershipFilter: false,
})

defineEmits<{
  'update:searchText': [value: string]
  'update:generations': [value: number[]]
  'update:regions': [value: Region[]]
  'update:specialForms': [value: SpecialFormType[]]
  'update:genderTypes': [value: GenderFilterType[]]
  'update:ownershipFilter': [value: OwnershipFilterType[]]
  'reset': []
}>()

const showPanel = ref(false)

const regionOptions = [
  { value: 'alola' as Region, label: 'アローラ' },
  { value: 'galar' as Region, label: 'ガラル' },
  { value: 'hisui' as Region, label: 'ヒスイ' },
  { value: 'paldea' as Region, label: 'パルデア' },
]

const specialFormOptions = [
  { value: 'mega' as SpecialFormType, label: 'メガシンカ' },
  { value: 'gigantamax' as SpecialFormType, label: 'キョダイマックス' },
  { value: 'primal' as SpecialFormType, label: 'ゲンシカイキ' },
]

const genderOptions = [
  { value: 'male' as GenderFilterType, label: 'オス' },
  { value: 'female' as GenderFilterType, label: 'メス' },
  { value: 'genderless' as GenderFilterType, label: '性別なし' },
]

const ownershipOptions = [
  { value: 'owned' as OwnershipFilterType, label: '所持のみ' },
  { value: 'unowned' as OwnershipFilterType, label: '未所持のみ' },
]
</script>

<style scoped>
.pokemon-search-filter__bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pokemon-search-filter__input {
  flex: 1;
}

.pokemon-search-filter__panel {
  margin-top: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
}

.pokemon-search-filter__section {
  margin-bottom: 12px;
}

.pokemon-search-filter__section:last-of-type {
  margin-bottom: 0;
}

.pokemon-search-filter__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
