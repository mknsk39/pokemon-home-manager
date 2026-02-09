import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AtomIcon from '../../components/atoms/AtomIcon.vue'

const meta: Meta<typeof AtomIcon> = {
  title: 'Atoms/AtomIcon',
  component: AtomIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    color: { control: 'text' },
    icon: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AtomIcon>

export const Default: Story = {
  args: {
    icon: 'mdi-pokeball',
    size: 48,
    color: 'primary',
  },
}
