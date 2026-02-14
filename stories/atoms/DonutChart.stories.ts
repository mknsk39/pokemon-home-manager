import type { Meta, StoryObj } from '@nuxtjs/storybook'
import DonutChart from '../../components/atoms/DonutChart.vue'

const meta: Meta<typeof DonutChart> = {
  title: 'Atoms/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100, step: 0.1 } },
    size: { control: { type: 'number' } },
    strokeWidth: { control: { type: 'number' } },
  },
}

export default meta
type Story = StoryObj<typeof DonutChart>

export const Default: Story = {
  args: {
    percentage: 50,
  },
}

export const Empty: Story = {
  args: {
    percentage: 0,
  },
}

export const Complete: Story = {
  args: {
    percentage: 100,
  },
}

export const SmallPercentage: Story = {
  args: {
    percentage: 2.5,
  },
}
