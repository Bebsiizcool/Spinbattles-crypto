'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia, hardhat } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

// Use only the injected connector (MetaMask, Brave, Coinbase extension, etc.)
// This avoids WalletConnect, which requires browser-only APIs that crash during SSR.
const config = createConfig({
  chains: [sepolia, hardhat],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
