import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AtomContainer from '../../components/atoms/AtomContainer.vue'

const meta: Meta<typeof AtomContainer> = {
  title: 'Atoms/AtomContainer',
  component: AtomContainer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AtomContainer>

export const Default: Story = {
  args: {
    default: 'Container content',
  },
}
