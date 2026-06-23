'use client'

import type { TxStatus } from '@/types'

interface Props {
  status: TxStatus
  txHash: string | null
  errorMessage: string | null
}

export function TransactionStatus({ status, txHash, errorMessage }: Props) {
  if (status === 'idle') {
    return (
      <div className="border border-slate-800/80 rounded-xl p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Transaction Status</p>
            <p className="text-sm font-medium text-slate-400">No active transaction</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`border rounded-xl p-5 backdrop-blur-md transition-all duration-300 shadow-lg ${
      status === 'pending'
        ? 'border-amber-500/20 bg-amber-950/10 shadow-amber-950/5'
        : status === 'confirmed'
        ? 'border-emerald-500/20 bg-emerald-950/10 shadow-emerald-950/5'
        : 'border-rose-500/20 bg-rose-950/10 shadow-rose-950/5'
    }`}>
      <div className="flex items-start gap-4">
        {/* Status Indicator Icon */}
        <div className="mt-0.5">
          {status === 'pending' ? (
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          ) : status === 'confirmed' ? (
            <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold">
              ✕
            </div>
          )}
        </div>

        {/* Status Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Transaction Status</p>
          
          <h4 className={`text-sm font-semibold ${
            status === 'pending'
              ? 'text-amber-400'
              : status === 'confirmed'
              ? 'text-emerald-400'
              : 'text-rose-400'
          }`}>
            {status === 'pending'
              ? txHash
                ? 'Confirming transaction on-chain...'
                : 'Claiming... Awaiting wallet signature'
              : status === 'confirmed'
              ? 'Claim successful!'
              : 'Transaction failed'}
          </h4>

          <p className="text-xs text-slate-400 mt-1">
            {status === 'pending'
              ? txHash
                ? 'Your transaction has been broadcasted. Waiting for block confirmation (~2-3s).'
                : 'Please approve the transaction in your browser wallet extension.'
              : status === 'confirmed'
              ? 'Your reward tokens have been successfully claimed and transferred to your wallet.'
              : errorMessage || 'An unexpected error occurred during execution.'}
          </p>

          {txHash && (
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Tx Hash:</span>
                <span className="text-slate-300 select-all font-semibold truncate max-w-[200px]" title={txHash}>
                  {txHash}
                </span>
              </div>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium w-fit mt-0.5"
              >
                View on Sepolia Etherscan ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
