export type TxStatus = 'idle' | 'pending' | 'confirmed' | 'failed'

export interface UserBalance {
  address: string
  offChainBalance: string
  token: string
  updatedAt: string
}

export interface Reward {
  id: string
  amount: string
  token: string
  status: 'pending' | 'claimed' | 'expired'
  claimedAt?: string
  txHash?: string
}

export interface RewardsResponse {
  address: string
  pendingRewards: Reward[]
  claimHistory: Reward[]
}

export interface ClaimRequest {
  address: string
  rewardId: string
  txHash: string
}

export interface ClaimResponse {
  success: boolean
  reward: Reward
  message: string
}
