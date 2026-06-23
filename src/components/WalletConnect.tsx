'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWallet } from '@/lib/hooks/useWallet'

export function WalletConnect() {
  const { address, isConnected } = useWallet()

  return (
    <div className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/40 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            Wallet Status
            {isConnected && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-in fade-in zoom-in duration-300">
                <span className="w-1.5 h-1.5 mr-1 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            )}
          </p>
          {isConnected && address ? (
            <p className="text-sm font-mono text-slate-200 break-all select-all hover:text-white transition-colors">
              {address}
            </p>
          ) : (
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              Not connected
            </p>
          )}
        </div>
        <ConnectButton
          showBalance={false}
          accountStatus="address"
          chainStatus="none"
        />
      </div>
    </div>
  )
}
