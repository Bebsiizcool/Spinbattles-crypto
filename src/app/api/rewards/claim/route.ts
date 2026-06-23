import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateRewards } from '@/lib/store/rewardsStore'
import type { ClaimRequest, ClaimResponse } from '@/types'

export async function POST(req: NextRequest) {
  const body: ClaimRequest = await req.json()
  const { address, rewardId, txHash } = body

  if (!address || !rewardId || !txHash) {
    return NextResponse.json(
      { error: 'address, rewardId, and txHash are required' },
      { status: 400 }
    )
  }

  const data = getOrCreateRewards(address)
  const reward = data.pendingRewards.find((r) => r.id === rewardId)

  if (!reward) {
    return NextResponse.json({ error: 'Reward not found' }, { status: 404 })
  }

  if (reward.status !== 'pending') {
    return NextResponse.json({ error: 'Reward already processed' }, { status: 409 })
  }

  // Mark reward as claimed in mock store
  reward.status = 'claimed'
  reward.claimedAt = new Date().toISOString()
  reward.txHash = txHash

  // Move from pending to history
  data.pendingRewards = data.pendingRewards.filter((r) => r.id !== rewardId)
  data.claimHistory.push(reward)

  const response: ClaimResponse = {
    success: true,
    reward,
    message: 'Reward claimed successfully.',
  }

  return NextResponse.json(response)
}
