import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AtomMenu from '../../components/atoms/AtomMenu.vue'
import AtomButton from '../../components/atoms/AtomButton.vue'
import AtomCard from '../../components/atoms/AtomCard.vue'

const meta: Meta<typeof AtomMenu> = {
  title: 'Atoms/AtomMenu',
  component: AtomMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AtomMenu>

export const Default: Story = {
  render: () => ({
    components: { AtomMenu, AtomButton, AtomCard },
    data: () => ({
      open: false,
    }),
    template: `
      <div style="padding: 32px;">
        <AtomMenu v-model="open">
          <template #activator="{ props }">
            <AtomButton v-bind="props" variant="outlined">Open menu</AtomButton>
          </template>
          <AtomCard class="pa-4" elevation="4" rounded="lg">
            <div class="text-body-2">Menu content</div>
          </AtomCard>
        </AtomMenu>
      </div>
    `,
  }),
}

