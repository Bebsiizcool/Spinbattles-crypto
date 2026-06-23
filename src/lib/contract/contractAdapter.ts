/**
 * Contract Adapter
 *
 * This module provides the interface for interacting with the SpinBattles reward contract.
 * It follows the same async pattern as a real on-chain contract call so the frontend
 * handles transaction lifecycle correctly: pending → confirmed | failed.
 *
 * In a production deployment, replace the mock implementations below with
 * real wagmi/viem writeContract and waitForTransactionReceipt calls.
 */

import type { RewardsResponse } from '@/types'

// Simulated on-chain balance (mock — replace with real readContract in production)
export async function readTokenBalance(address: string): Promise<string> {
  // Simulate network latency
  await delay(600)
  
  // Return deterministic mock balance based on address suffix
  const suffix = parseInt(address.slice(-4), 16)
  const baseBalance = (suffix % 900) + 100

  try {
    // Dynamically fetch claimed rewards to simulate actual token minting/transfer on-chain
    const res = await fetch(`/api/user/rewards?address=${encodeURIComponent(address)}`)
    if (res.ok) {
      const data = (await res.json()) as RewardsResponse
      // Sum the amounts of all claimed rewards in history
      const claimedSum = data.claimHistory
        ? data.claimHistory.reduce((sum, reward) => sum + parseFloat(reward.amount), 0)
        : 0
      return (baseBalance + claimedSum).toFixed(2)
    }
  } catch (error) {
    // If request fails (e.g. during SSR or network issue), fallback to base balance
    console.error('Failed to fetch claimed rewards for balance calculation:', error)
  }

  return baseBalance.toFixed(2)
}

/**
 * submitClaimTransaction
 *
 * Simulates submitting a claimReward transaction to the contract.
 * Returns a transaction hash immediately (like eth_sendTransaction would).
 * The caller MUST then wait for confirmation before treating the claim as complete.
 *
 * Transaction confirmation is simulated via waitForConfirmation() below.
 */
export async function submitClaimTransaction(
  _address: string,
  rewardId: string
): Promise<string> {
  await delay(800) // simulate wallet signing + broadcast latency

  // Simulate occasional transaction failure (~20% of the time)
  // This forces proper error handling in the claim flow
  if (Math.random() < 0.2) {
    throw new Error('Transaction rejected: insufficient gas or wallet rejection')
  }

  // Return a mock transaction hash
  const txHash = `0x${randomHex(64)}`
  return txHash
}

/**
 * waitForConfirmation
 *
 * Waits for a transaction to be confirmed or rejected on-chain.
 * Equivalent to viem's waitForTransactionReceipt in production.
 *
 * Returns 'confirmed' or 'failed'.
 */
export async function waitForConfirmation(txHash: string): Promise<'confirmed' | 'failed'> {
  // Simulate block confirmation time (1.5–3s)
  await delay(1500 + Math.random() * 1500)

  // Simulate ~15% chance of transaction failing after submission
  // (e.g., reverted on-chain)
  if (Math.random() < 0.15) {
    return 'failed'
  }

  return 'confirmed'
}

// --- Helpers ---

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomHex(length: number): string {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}
