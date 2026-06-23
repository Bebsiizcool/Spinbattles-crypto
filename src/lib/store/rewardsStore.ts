import type { RewardsResponse } from '@/types'

// In-memory mock rewards store (resets on server restart)
// Shared between /api/user/rewards and /api/rewards/claim routes
export const rewardsStore: Record<string, RewardsResponse> = {}

export function getOrCreateRewards(address: string): RewardsResponse {
  if (!rewardsStore[address]) {
    rewardsStore[address] = {
      address,
      pendingRewards: [
        {
          id: 'reward-001',
          amount: '100.00',
          token: 'SPIN',
          status: 'pending',
        },
      ],
      claimHistory: [],
    }
  }
  return rewardsStore[address]
}
