'use client'

import type { TxStatus, Reward } from '@/types'

interface Props {
  reward: Reward | undefined
  txStatus: TxStatus
  onClaim: (reward: Reward) => void
}

export function ClaimButton({ reward, txStatus, onClaim }: Props) {
  const isPending = txStatus === 'pending'
  const canClaim = reward?.status === 'pending' && !isPending

  return (
    <button
      onClick={() => reward && onClaim(reward)}
      disabled={!canClaim}
      className={`
        w-full py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2
        ${canClaim
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] cursor-pointer'
          : isPending
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-wait animate-pulse'
          : reward?.status === 'claimed'
          ? 'bg-slate-800/80 text-emerald-400 border border-emerald-500/20 cursor-not-allowed font-medium'
          : 'bg-slate-800/60 text-slate-500 border border-slate-800/80 cursor-not-allowed font-medium'
        }
      `}
    >
      {isPending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Claiming Reward...
        </>
      ) : reward?.status === 'claimed' ? (
        <>
          <span className="text-emerald-400 mr-1">✓</span> Reward Claimed
        </>
      ) : (
        'Claim Reward'
      )}
    </button>
  )
}
