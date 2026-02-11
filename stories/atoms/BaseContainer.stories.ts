import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseContainer from '../../components/atoms/BaseContainer.vue'

const meta: Meta<typeof BaseContainer> = {
  title: 'Atoms/BaseContainer',
  component: BaseContainer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseContainer>

export const Default: Story = {
  args: {
    default: 'Container content',
  },
}
