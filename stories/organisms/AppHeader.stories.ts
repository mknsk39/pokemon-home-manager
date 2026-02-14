import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AppHeader from '../../components/organisms/AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {
    onLogout: { action: 'logout' },
    onNavigate: { action: 'navigate' },
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

const sampleProfile = {
  id: 'user-1',
  displayName: 'Trainer',
  photoURL: 'https://example.com/avatar.png',
}

export const LoggedOut: Story = {
  args: {
    profile: null,
    logoutLoading: false,
    error: null,
  },
}

export const LoggedIn: Story = {
  args: {
    profile: sampleProfile,
    logoutLoading: false,
    error: null,
  },
}

export const LogoutLoading: Story = {
  args: {
    profile: sampleProfile,
    logoutLoading: true,
    error: null,
  },
}

export const WithNavigation: Story = {
  args: {
    profile: sampleProfile,
    logoutLoading: false,
    error: null,
    currentPath: '/',
  },
}

export const OnDashboard: Story = {
  args: {
    profile: sampleProfile,
    logoutLoading: false,
    error: null,
    currentPath: '/dashboard',
  },
}
