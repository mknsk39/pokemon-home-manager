import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseChip from '../../components/atoms/BaseChip.vue'

const meta: Meta<typeof BaseChip> = {
  title: 'Atoms/BaseChip',
  component: BaseChip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseChip>

export const Default: Story = {
  args: {
    default: '第1世代',
    value: 1,
  },
}

export const Filter: Story = {
  args: {
    default: 'メガシンカ',
    filter: true,
    value: 'mega',
  },
}
