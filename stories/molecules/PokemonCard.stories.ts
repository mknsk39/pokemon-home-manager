import type { Meta, StoryObj } from '@nuxtjs/storybook'
import PokemonCard from '../../components/molecules/PokemonCard.vue'

const meta: Meta<typeof PokemonCard> = {
  title: 'Molecules/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonCard>

export const Default: Story = {
  args: {
    dexNo: 1,
    name: 'フシギダネ',
  },
}

export const WithFormName: Story = {
  args: {
    dexNo: 3,
    name: 'フシギバナ',
    formName: 'オスのすがた',
  },
}

export const WithLongFormName: Story = {
  args: {
    dexNo: 6,
    name: 'リザードン',
    formName: 'キョダイマックスのすがた',
  },
  decorators: [
    () => ({
      template: '<div style="width: 224px;"><story /></div>',
    }),
  ],
}

export const Owned: Story = {
  args: {
    dexNo: 25,
    name: 'ピカチュウ',
    owned: true,
    clickable: true,
  },
}

export const Unowned: Story = {
  args: {
    dexNo: 150,
    name: 'ミュウツー',
    owned: false,
    clickable: true,
  },
}

export const FullyOwnedSpecies: Story = {
  args: {
    dexNo: 3,
    name: 'フシギバナ',
    owned: true,
    ownedCount: 2,
    totalFormCount: 2,
  },
}

export const PartiallyOwnedSpecies: Story = {
  args: {
    dexNo: 150,
    name: 'ミュウツー',
    owned: false,
    ownedCount: 1,
    totalFormCount: 3,
  },
}

export const UnownedSpecies: Story = {
  args: {
    dexNo: 151,
    name: 'ミュウ',
    owned: false,
    ownedCount: 0,
    totalFormCount: 1,
  },
}
