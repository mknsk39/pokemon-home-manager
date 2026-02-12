import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseChipGroup from '../../components/atoms/BaseChipGroup.vue'

const meta: Meta<typeof BaseChipGroup> = {
  title: 'Atoms/BaseChipGroup',
  component: BaseChipGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseChipGroup>

export const Default: Story = {
  args: {
    multiple: true,
    column: true,
  },
  render: (args) => ({
    components: { BaseChipGroup },
    setup() {
      return { args }
    },
    template: `
      <BaseChipGroup v-bind="args">
        <v-chip value="1" filter>第1世代</v-chip>
        <v-chip value="2" filter>第2世代</v-chip>
        <v-chip value="3" filter>第3世代</v-chip>
      </BaseChipGroup>
    `,
  }),
}
