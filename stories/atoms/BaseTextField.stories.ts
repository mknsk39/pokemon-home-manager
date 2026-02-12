import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseTextField from '../../components/atoms/BaseTextField.vue'

const meta: Meta<typeof BaseTextField> = {
  title: 'Atoms/BaseTextField',
  component: BaseTextField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseTextField>

export const Default: Story = {
  args: {
    placeholder: 'テキストを入力...',
  },
}

export const WithSearchIcon: Story = {
  args: {
    placeholder: '名前 または 図鑑No. で検索...',
    prependInnerIcon: 'mdi-magnify',
    clearable: true,
    hideDetails: true,
    density: 'compact',
  },
}
