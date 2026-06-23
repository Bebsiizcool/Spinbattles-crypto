'use client'

import { WalletConnect } from '@/components/WalletConnect'
import { RewardPanel } from '@/components/RewardPanel'
import { useWallet } from '@/lib/hooks/useWallet'

export default function Home() {
  const { isConnected } = useWallet()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 relative">
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-indigo-900/10 via-purple-900/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-800/60">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              SpinBattles <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Claim Portal</span>
            </h1>
          </div>
          <p className="text-slate-400 text-xs font-medium">Developer Assessment Reward Verification Dashboard</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 w-fit mx-auto md:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Sepolia Testnet / Hardhat
        </div>
      </div>

      {/* Wallet section */}
      <div className="shadow-lg shadow-black/10">
        <WalletConnect />
      </div>

      {/* Main dashboard content */}
      {isConnected ? (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <RewardPanel />
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-slate-800/80 rounded-xl p-8 bg-slate-900/10 text-center backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-300 mb-1">Awaiting Wallet Connection</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Connect your Web3 browser wallet (e.g. MetaMask, Rainbow) to view pending off-chain database rewards, verify live smart contract token balances, and claim pending SPIN tokens.
          </p>
          <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 font-mono bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-900">
            <span>Flow verification helper active</span>
          </div>
        </div>
      )}

      {/* Interactive Developer Verification Guide */}
      <div className="mt-12 border border-slate-800/50 rounded-xl p-5 bg-slate-950/30 backdrop-blur-sm text-xs text-slate-400">
        <h4 className="font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Assessment Test Guide & Scenarios
        </h4>
        <ul className="space-y-2 list-none">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">•</span>
            <span>
              <strong>Scenario A (Success Path)</strong>: Connect wallet, click <strong>Claim Reward</strong>. The transaction is submitted on-chain (Pending), confirmed (Confirmed), the backend database transitions the status to Claimed, and your <strong>On-chain Balance</strong> updates dynamically (+100 SPIN).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">•</span>
            <span>
              <strong>Scenario B (Wallet Rejection)</strong>: Submit claim. Rejection is simulated ~20% of the time. The transaction immediately fails. The reward remains pending in the backend, and no state is corrupted.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">•</span>
            <span>
              <strong>Scenario C (On-chain Revert)</strong>: Submit claim. Block rejection is simulated ~15% of the time during block mining. The transaction fails on-chain. Crucially, the reward remains pending in the backend, allowing a retry.
            </span>
          </li>
        </ul>
      </div>
    </main>
  )
}
