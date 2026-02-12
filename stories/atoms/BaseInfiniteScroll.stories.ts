import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseInfiniteScroll from '../../components/atoms/BaseInfiniteScroll.vue'

const meta: Meta<typeof BaseInfiniteScroll> = {
  title: 'Atoms/BaseInfiniteScroll',
  component: BaseInfiniteScroll,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['intersect', 'manual'] },
    side: { control: 'select', options: ['start', 'end', 'both'] },
    height: { control: 'text' },
    maxHeight: { control: 'text' },
    emptyText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BaseInfiniteScroll>

export const Default: Story = {
  args: {
    height: 300,
  },
}
