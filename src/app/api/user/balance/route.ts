import { NextRequest, NextResponse } from 'next/server'
import type { UserBalance } from '@/types'

// In-memory mock data - deterministic per address
export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'address query param required' }, { status: 400 })
  }

  const balance: UserBalance = {
    address,
    offChainBalance: '250.00',
    token: 'SPIN',
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(balance)
}
