import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseExpandTransition from '../../components/atoms/BaseExpandTransition.vue'
import BaseButton from '../../components/atoms/BaseButton.vue'
import BaseCard from '../../components/atoms/BaseCard.vue'

const meta: Meta<typeof BaseExpandTransition> = {
  title: 'Atoms/BaseExpandTransition',
  component: BaseExpandTransition,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaseExpandTransition>

export const Default: Story = {
  render: () => ({
    components: { BaseExpandTransition, BaseButton, BaseCard },
    data() {
      return {
        show: false,
      }
    },
    template: `
      <div>
        <BaseButton @click="show = !show" color="primary">
          {{ show ? '隠す' : '表示' }}
        </BaseButton>
        <BaseExpandTransition>
          <BaseCard v-show="show" style="margin-top: 16px;">
            <div style="padding: 16px;">
              <p>これは展開トランジションのデモです。</p>
              <p>ボタンをクリックすると、スムーズに展開・収縮します。</p>
            </div>
          </BaseCard>
        </BaseExpandTransition>
      </div>
    `,
  }),
}

export const WithList: Story = {
  render: () => ({
    components: { BaseExpandTransition, BaseButton, BaseCard },
    data() {
      return {
        show: false,
      }
    },
    template: `
      <div>
        <BaseButton @click="show = !show" color="primary" prepend-icon="mdi-menu">
          メニュー
        </BaseButton>
        <BaseExpandTransition>
          <BaseCard v-show="show" style="margin-top: 8px;">
            <div style="padding: 16px;">
              <ul style="margin: 0; padding-left: 20px;">
                <li>項目 1</li>
                <li>項目 2</li>
                <li>項目 3</li>
                <li>項目 4</li>
                <li>項目 5</li>
              </ul>
            </div>
          </BaseCard>
        </BaseExpandTransition>
      </div>
    `,
  }),
}

export const MultipleTransitions: Story = {
  render: () => ({
    components: { BaseExpandTransition, BaseButton, BaseCard },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <BaseButton @click="show1 = !show1" color="primary" size="small">
            セクション 1
          </BaseButton>
          <BaseExpandTransition>
            <BaseCard v-show="show1" style="margin-top: 8px;">
              <div style="padding: 16px;">セクション 1 の内容</div>
            </BaseCard>
          </BaseExpandTransition>
        </div>

        <div>
          <BaseButton @click="show2 = !show2" color="secondary" size="small">
            セクション 2
          </BaseButton>
          <BaseExpandTransition>
            <BaseCard v-show="show2" style="margin-top: 8px;">
              <div style="padding: 16px;">セクション 2 の内容</div>
            </BaseCard>
          </BaseExpandTransition>
        </div>

        <div>
          <BaseButton @click="show3 = !show3" color="success" size="small">
            セクション 3
          </BaseButton>
          <BaseExpandTransition>
            <BaseCard v-show="show3" style="margin-top: 8px;">
              <div style="padding: 16px;">セクション 3 の内容</div>
            </BaseCard>
          </BaseExpandTransition>
        </div>
      </div>
    `,
  }),
}
