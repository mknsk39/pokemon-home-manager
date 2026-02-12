import { describe, expect, it } from 'vitest'
import { createMasterDataService } from '../../services/masterData'

describe('master data service', () => {
  it('provides indexed accessors', () => {
    const service = createMasterDataService()

    const bulbasaur = service.getSpecies(1)
    expect(bulbasaur?.name).toBe('フシギダネ')

    const venusaurForms = service.listForms(3)
    expect(venusaurForms.some((form) => form.id === 300)).toBe(true)
    expect(service.getForm(302)?.isMega).toBe(true)
    expect(service.getForm(303)?.isGigantamax).toBe(true)
    expect(service.getForm(300)?.imageUrl).toBe('')
  })

  it('returns all species sorted by id via listSpecies', () => {
    const service = createMasterDataService()
    const species = service.listSpecies()

    expect(species.length).toBeGreaterThan(0)

    for (let i = 1; i < species.length; i++) {
      expect(species[i].id).toBeGreaterThan(species[i - 1].id)
    }
  })

  it('returns undefined for non-existent species and form', () => {
    const service = createMasterDataService()

    expect(service.getSpecies(999999)).toBeUndefined()
    expect(service.getForm(999999)).toBeUndefined()
  })

  it('returns empty array for species with no forms', () => {
    const service = createMasterDataService()

    expect(service.listForms(999999)).toEqual([])
  })

  it('returns all forms sorted by id via listAllForms', () => {
    const service = createMasterDataService()
    const allForms = service.listAllForms()

    expect(allForms.length).toBe(1591)

    for (let i = 1; i < allForms.length; i++) {
      expect(allForms[i].id).toBeGreaterThan(allForms[i - 1].id)
    }
  })
})

