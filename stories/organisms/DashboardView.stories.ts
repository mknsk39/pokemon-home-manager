import type { Meta, StoryObj } from '@nuxtjs/storybook'
import DashboardView from '../../components/organisms/DashboardView.vue'

const meta: Meta<typeof DashboardView> = {
  title: 'Organisms/DashboardView',
  component: DashboardView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DashboardView>

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
