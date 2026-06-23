/** Fetches reward and balance data, and handles the claim transaction flow. */

import { useState, useCallback, useEffect } from 'react'
import { fetchUserBalance, fetchUserRewards, postClaimReward } from '@/lib/api/rewardsApi'
import {
  readTokenBalance,
  submitClaimTransaction,
  waitForConfirmation,
} from '@/lib/contract/contractAdapter'
import type { TxStatus, Reward, UserBalance, RewardsResponse } from '@/types'

interface RewardsState {
  balance: UserBalance | null
  rewards: RewardsResponse | null
  onChainBalance: string | null
  txStatus: TxStatus
  txHash: string | null
  errorMessage: string | null
  isLoading: boolean
}

export function useRewards(address: string | undefined) {
  const [state, setState] = useState<RewardsState>({
    balance: null,
    rewards: null,
    onChainBalance: null,
    txStatus: 'idle',
    txHash: null,
    errorMessage: null,
    isLoading: false,
  })

  const refresh = useCallback(async () => {
    if (!address) return
    setState((s) => ({ ...s, isLoading: true, errorMessage: null }))
    try {
      const [balance, rewards, onChainBalance] = await Promise.all([
        fetchUserBalance(address),
        fetchUserRewards(address),
        readTokenBalance(address),
      ])
      setState((s) => ({ ...s, balance, rewards, onChainBalance, isLoading: false }))
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        errorMessage: err instanceof Error ? err.message : 'Failed to load data',
      }))
    }
  }, [address])

  useEffect(() => {
    refresh()
  }, [refresh])

  const claim = useCallback(
    async (reward: Reward) => {
      if (!address) return

      setState((s) => ({ ...s, txStatus: 'pending', txHash: null, errorMessage: null }))

      try {
        // Step 1: Submit transaction to simulated wallet
        const txHash = await submitClaimTransaction(address, reward.id)
        setState((s) => ({ ...s, txHash }))

        // Step 2: Wait for transaction block confirmation on-chain
        const confirmationResult = await waitForConfirmation(txHash)
        if (confirmationResult === 'failed') {
          setState((s) => ({
            ...s,
            txStatus: 'failed',
            errorMessage: 'Transaction failed on-chain.',
          }))
          return
        }

        // Step 3: Transaction is confirmed on-chain, notify the backend to claim the reward
        await postClaimReward({ address, rewardId: reward.id, txHash })
        setState((s) => ({ ...s, txStatus: 'confirmed' }))

        // Step 4: Refresh UI states (balances, rewards list)
        await refresh()
      } catch (err) {
        setState((s) => ({
          ...s,
          txStatus: 'failed',
          errorMessage: err instanceof Error ? err.message : 'Claim failed',
        }))
      }
    },
    [address, refresh]
  )

  return { ...state, refresh, claim }
}
