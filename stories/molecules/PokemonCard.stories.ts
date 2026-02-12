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
