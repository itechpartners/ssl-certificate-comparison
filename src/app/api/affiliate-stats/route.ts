import { NextRequest, NextResponse } from 'next/server'

const affiliateStats = {
  sectigo: { clicks: 1247, conversions: 89, revenue: 2670.00 },
  digicert: { clicks: 892, conversions: 134, revenue: 13400.00 },
  'lets-encrypt': { clicks: 3421, conversions: 0, revenue: 0 },
  cloudflare: { clicks: 2156, conversions: 156, revenue: 0 },
  godaddy: { clicks: 1034, conversions: 67, revenue: 4686.50 },
  globalsign: { clicks: 456, conversions: 28, revenue: 4200.00 },
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: affiliateStats })
}
