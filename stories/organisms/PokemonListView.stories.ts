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
