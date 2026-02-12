import type { Meta, StoryObj } from '@nuxtjs/storybook'
import PokemonListView from '../../components/organisms/PokemonListView.vue'

const meta: Meta<typeof PokemonListView> = {
  title: 'Organisms/PokemonListView',
  component: PokemonListView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonListView>

const sampleItems = [
  { id: 1, dexNo: 1, name: 'フシギダネ' },
  { id: 4, dexNo: 4, name: 'ヒトカゲ' },
  { id: 7, dexNo: 7, name: 'ゼニガメ' },
  { id: 25, dexNo: 25, name: 'ピカチュウ' },
  { id: 133, dexNo: 133, name: 'イーブイ' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}

export const WithHeaderActions: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { PokemonListView },
    setup() {
      return { args }
    },
    template: `
      <PokemonListView v-bind="args">
        <template #header-actions>
          <v-btn-toggle model-value="species" mandatory color="primary" variant="outlined" density="compact" divided>
            <v-btn value="species">種別</v-btn>
            <v-btn value="forms">すがた</v-btn>
          </v-btn-toggle>
        </template>
      </PokemonListView>
    `,
  }),
}

export const WithToolbar: Story = {
  args: {
    items: sampleItems,
    filteredCount: 3,
    totalCount: 5,
  },
  render: (args) => ({
    components: { PokemonListView },
    setup() {
      return { args }
    },
    template: `
      <PokemonListView v-bind="args">
        <template #toolbar>
          <v-text-field
            placeholder="名前 または 図鑑No. で検索..."
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            density="compact"
            variant="outlined"
          />
        </template>
      </PokemonListView>
    `,
  }),
}

export const WithFormNames: Story = {
  args: {
    items: [
      { id: 1, dexNo: 3, name: 'フシギバナ', formName: 'オスのすがた' },
      { id: 2, dexNo: 3, name: 'フシギバナ', formName: 'メスのすがた' },
      { id: 3, dexNo: 6, name: 'リザードン' },
      { id: 4, dexNo: 6, name: 'リザードン', formName: 'メガリザードンX' },
    ],
  },
}
