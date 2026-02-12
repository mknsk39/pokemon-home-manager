import type { Meta, StoryObj } from '@nuxtjs/storybook'
import PokemonSearchFilter from '../../components/molecules/PokemonSearchFilter.vue'

const meta: Meta<typeof PokemonSearchFilter> = {
  title: 'Molecules/PokemonSearchFilter',
  component: PokemonSearchFilter,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonSearchFilter>

export const Default: Story = {
  args: {
    searchText: '',
    generations: [],
    regions: [],
    specialForms: [],
    genderTypes: [],
    ownershipFilter: [],
    isFilterActive: false,
  },
}

export const WithActiveFilter: Story = {
  args: {
    searchText: 'ピカ',
    generations: [1],
    regions: [],
    specialForms: [],
    genderTypes: [],
    ownershipFilter: [],
    isFilterActive: true,
  },
}

export const WithOwnershipFilter: Story = {
  args: {
    searchText: '',
    generations: [],
    regions: [],
    specialForms: [],
    genderTypes: [],
    ownershipFilter: ['owned'],
    isFilterActive: true,
    showOwnershipFilter: true,
  },
}
