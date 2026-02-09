import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AtomCard from '../../components/atoms/AtomCard.vue'

const meta: Meta<typeof AtomCard> = {
  title: 'Atoms/AtomCard',
  component: AtomCard,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'text' },
    elevation: { control: 'number' },
    rounded: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AtomCard>

export const Default: Story = {
  args: {
    color: 'surface',
    elevation: 8,
    rounded: 'lg',
    default: 'Card content',
  },
}
