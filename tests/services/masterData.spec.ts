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
})

