import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseMenu from '../../components/atoms/BaseMenu.vue'
import BaseButton from '../../components/atoms/BaseButton.vue'
import BaseCard from '../../components/atoms/BaseCard.vue'

const meta: Meta<typeof BaseMenu> = {
  title: 'Atoms/BaseMenu',
  component: BaseMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseMenu>

export const Default: Story = {
  render: () => ({
    components: { BaseMenu, BaseButton, BaseCard },
    data: () => ({
      open: false,
    }),
    template: `
      <div style="padding: 32px;">
        <BaseMenu v-model="open">
          <template #activator="{ props }">
            <BaseButton v-bind="props" variant="outlined">Open menu</BaseButton>
          </template>
          <BaseCard class="pa-4" elevation="4" rounded="lg">
            <div class="text-body-2">Menu content</div>
          </BaseCard>
        </BaseMenu>
      </div>
    `,
  }),
}
