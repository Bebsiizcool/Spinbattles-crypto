'use client'

import { useWallet } from '@/lib/hooks/useWallet'
import { useRewards } from '@/lib/hooks/useRewards'
import { ClaimButton } from './ClaimButton'
import { TransactionStatus } from './TransactionStatus'

export function RewardPanel() {
  const { address } = useWallet()
  const {
    balance,
    rewards,
    onChainBalance,
    txStatus,
    txHash,
    errorMessage,
    isLoading,
    claim,
    refresh,
  } = useRewards(address)

  const pendingReward = rewards?.pendingRewards[0]
  const loading = isLoading && !balance // only show full loading state on first load

  return (
    <div className="space-y-6">
      {/* Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Off-chain balance */}
        <div className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/40 backdrop-blur-md hover:border-slate-700/80 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Off-chain Balance</p>
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white font-mono tracking-tight">
            {loading ? (
              <span className="inline-block w-16 h-6 bg-slate-800 animate-pulse rounded"></span>
            ) : balance ? (
              `${parseFloat(balance.offChainBalance).toLocaleString()} ${balance.token}`
            ) : (
              '—'
            )}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Database state sync status: Active</p>
        </div>

        {/* On-chain token balance */}
        <div className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/40 backdrop-blur-md hover:border-slate-700/80 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">On-chain Balance</p>
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V9a1.5 1.5 0 00-1.5-1.5H7.5A1.5 1.5 0 006 9v.75a8.967 8.967 0 01-2.312 6.022M9 3h4m-4 9h6m-6 3h6m-13-6a9 9 0 0118 0v.75c0 2.213-.886 4.301-2.472 5.865l-1.64 1.64c-.39.39-.39 1.025 0 1.414l.054.09" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white font-mono tracking-tight">
            {loading ? (
              <span className="inline-block w-16 h-6 bg-slate-800 animate-pulse rounded"></span>
            ) : onChainBalance ? (
              `${parseFloat(onChainBalance).toLocaleString()} SPIN`
            ) : (
              '—'
            )}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Direct smart contract adapter reads</p>
        </div>
      </div>

      {/* Pending reward hero box */}
      <div className="border border-slate-800/80 rounded-xl p-6 bg-gradient-to-br from-indigo-950/20 via-slate-900/40 to-purple-950/20 backdrop-blur-md hover:border-slate-700/60 transition-all duration-300 shadow-lg relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Claimable Prize pool</p>
            <h3 className="text-lg font-semibold text-white mt-0.5">Your Active Rewards</h3>
          </div>
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="h-8 bg-slate-800 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-slate-800 animate-pulse rounded w-1/4"></div>
          </div>
        ) : pendingReward ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight">
                {pendingReward.amount}
              </span>
              <span className="text-indigo-400 font-bold text-sm">{pendingReward.token}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span>Security hash verification code:</span>
              <span className="font-mono bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400 font-semibold select-all">
                {pendingReward.id}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-2 text-center md:text-left">
            <p className="text-base font-medium text-slate-400">
              {rewards?.claimHistory.length ? '🎉 All pending rewards claimed successfully!' : 'No pending rewards available.'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {rewards?.claimHistory.length 
                ? 'Check your claim history and on-chain balance updates.'
                : 'Play matches and rank up to earn SPIN tokens.'}
            </p>
          </div>
        )}
      </div>

      {/* Stats and button container */}
      <div className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <span>Backend Reward database sync</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Pending: <strong className="text-slate-300 font-mono">{rewards?.pendingRewards.length ?? '0'}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Claimed: <strong className="text-slate-300 font-mono">{rewards?.claimHistory.length ?? '0'}</strong>
            </span>
          </div>
        </div>

        {/* Claim button */}
        <ClaimButton
          reward={pendingReward}
          txStatus={txStatus}
          onClaim={claim}
        />
      </div>

      {/* Transaction status */}
      <TransactionStatus
        status={txStatus}
        txHash={txHash}
        errorMessage={errorMessage}
      />

      {/* Refresh controls */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-500">
        <span>Last synchronization: {balance ? new Date(balance.updatedAt).toLocaleTimeString() : 'Never'}</span>
        <button
          onClick={refresh}
          disabled={isLoading}
          className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-800/80 rounded-full bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-40 cursor-pointer font-medium hover:border-slate-700/80"
        >
          <svg className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16" />
          </svg>
          {isLoading ? 'Syncing...' : 'Sync state'}
        </button>
      </div>
    </div>
  )
}
