import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseIcon from '../../components/atoms/BaseIcon.vue'

const meta: Meta<typeof BaseIcon> = {
  title: 'Atoms/BaseIcon',
  component: BaseIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    color: { control: 'text' },
    icon: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BaseIcon>

export const Default: Story = {
  args: {
    icon: 'mdi-pokeball',
    size: 48,
    color: 'primary',
  },
}
