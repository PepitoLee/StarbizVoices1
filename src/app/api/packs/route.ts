import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest, unauthorizedResponse } from '@/lib/auth';
import { localPacks } from '@/lib/local-audio-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) return unauthorizedResponse();

  const sorted = [...localPacks].sort((a, b) => a.sort_order - b.sort_order);

  const response = NextResponse.json({ packs: sorted });
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}
