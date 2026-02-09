import type { MasterDataService } from '../services/masterData'
import { createMasterDataService } from '../services/masterData'

let cached: MasterDataService | undefined

export const useMasterData = (): MasterDataService => {
  cached ??= createMasterDataService()
  return cached
}

