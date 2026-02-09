import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AuthLoginCard from '../../components/organisms/AuthLoginCard.vue'

const meta: Meta<typeof AuthLoginCard> = {
  title: 'Organisms/AuthLoginCard',
  component: AuthLoginCard,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AuthLoginCard>

export const Default: Story = {
  args: {
    loading: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
  },
}

export const WithError: Story = {
  args: {
    loading: false,
    error: 'Google ログインに失敗しました',
  },
}
