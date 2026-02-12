import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseTooltip from '../../components/atoms/BaseTooltip.vue'

const meta: Meta<typeof BaseTooltip> = {
  title: 'Atoms/BaseTooltip',
  component: BaseTooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseTooltip>

export const Default: Story = {
  args: {
    text: 'ツールチップのテキスト',
    location: 'bottom',
  },
  render: (args) => ({
    components: { BaseTooltip },
    setup() {
      return { args }
    },
    template: `
      <BaseTooltip v-bind="args">
        <template #activator="{ props }">
          <v-btn v-bind="props">ホバーしてね</v-btn>
        </template>
      </BaseTooltip>
    `,
  }),
}

export const LocationTop: Story = {
  args: {
    text: '上に表示されるよ',
    location: 'top',
  },
  render: (args) => ({
    components: { BaseTooltip },
    setup() {
      return { args }
    },
    template: `
      <div style="margin-top: 60px;">
        <BaseTooltip v-bind="args">
          <template #activator="{ props }">
            <v-btn v-bind="props">ホバーしてね</v-btn>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
}
