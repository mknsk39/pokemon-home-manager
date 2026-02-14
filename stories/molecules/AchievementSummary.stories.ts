import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AchievementSummary from '../../components/molecules/AchievementSummary.vue'

const meta: Meta<typeof AchievementSummary> = {
  title: 'Molecules/AchievementSummary',
  component: AchievementSummary,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AchievementSummary>

export const Default: Story = {
  args: {
    ownedCount: 721,
    totalCount: 1591,
    percentage: 45.3,
  },
}

export const Empty: Story = {
  args: {
    ownedCount: 0,
    totalCount: 1591,
    percentage: 0,
  },
}

export const Complete: Story = {
  args: {
    ownedCount: 1591,
    totalCount: 1591,
    percentage: 100,
  },
}

export const LowProgress: Story = {
  args: {
    ownedCount: 40,
    totalCount: 1591,
    percentage: 2.5,
  },
}
