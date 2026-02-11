import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest, unauthorizedResponse } from '@/lib/auth';
import { localAudios } from '@/lib/local-audio-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) return unauthorizedResponse();

  const shuffled = [...localAudios].sort(() => Math.random() - 0.5);

  const response = NextResponse.json({ audios: shuffled });
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}
