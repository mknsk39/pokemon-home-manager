import type { Meta, StoryObj } from '@nuxtjs/storybook'
import BaseButton from '../../components/atoms/BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
    title: 'Atoms/BaseButton',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['x-small', 'small', 'default', 'large', 'x-large'],
        },
        color: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof BaseButton>

export const Primary: Story = {
    args: {
        color: 'primary',
        default: 'Primary Button',
    },
}

export const Secondary: Story = {
    args: {
        color: 'secondary',
        default: 'Secondary Button',
    },
}

export const WithIcon: Story = {
    args: {
        color: 'primary',
        prependIcon: 'mdi-pokeball',
        default: 'With Icon',
    },
}
