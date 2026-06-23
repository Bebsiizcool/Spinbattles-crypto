import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateRewards } from '@/lib/store/rewardsStore'

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'address query param required' }, { status: 400 })
  }

  const data = getOrCreateRewards(address)
  return NextResponse.json(data)
}
