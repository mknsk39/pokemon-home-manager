import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseCard from '../../components/atoms/BaseCard.vue'

const meta: Meta<typeof BaseCard> = {
  title: 'Atoms/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'text' },
    elevation: { control: 'number' },
    rounded: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BaseCard>

export const Default: Story = {
  args: {
    color: 'surface',
    elevation: 8,
    rounded: 'lg',
    default: 'Card content',
  },
}
