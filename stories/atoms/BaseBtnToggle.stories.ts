import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseBtnToggle from '../../components/atoms/BaseBtnToggle.vue'

const meta: Meta<typeof BaseBtnToggle> = {
  title: 'Atoms/BaseBtnToggle',
  component: BaseBtnToggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseBtnToggle>

export const Default: Story = {
  args: {
    modelValue: 'species',
    mandatory: true,
  },
  render: (args) => ({
    components: { BaseBtnToggle },
    setup() {
      return { args }
    },
    template: `
      <BaseBtnToggle v-bind="args">
        <v-btn value="species">種別</v-btn>
        <v-btn value="forms">すがた</v-btn>
      </BaseBtnToggle>
    `,
  }),
}

export const MultipleOptions: Story = {
  args: {
    modelValue: 'grid',
    mandatory: true,
    color: 'secondary',
  },
  render: (args) => ({
    components: { BaseBtnToggle },
    setup() {
      return { args }
    },
    template: `
      <BaseBtnToggle v-bind="args">
        <v-btn value="grid">グリッド</v-btn>
        <v-btn value="list">リスト</v-btn>
        <v-btn value="compact">コンパクト</v-btn>
      </BaseBtnToggle>
    `,
  }),
}
