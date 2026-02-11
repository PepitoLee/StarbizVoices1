import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest, unauthorizedResponse } from '@/lib/auth';
import { getPackById, getAudiosByPackId } from '@/lib/local-audio-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuthFromRequest(request);
  if (!auth) return unauthorizedResponse();

  const pack = getPackById(params.id);
  if (!pack) {
    return NextResponse.json({ error: 'Pack no encontrado' }, { status: 404 });
  }

  const audios = getAudiosByPackId(params.id);

  const response = NextResponse.json({ pack, audios });
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}
