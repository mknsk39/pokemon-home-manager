import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AtomButton from '../../components/atoms/AtomButton.vue'

const meta: Meta<typeof AtomButton> = {
    title: 'Atoms/AtomButton',
    component: AtomButton,
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
type Story = StoryObj<typeof AtomButton>

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
