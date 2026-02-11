import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const host = request.headers.get('host') || '';
  if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
    return NextResponse.json({ error: 'No disponible' }, { status: 403 });
  }

  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Solo desarrollo' }, { status: 403 });
  }

  const token = await createToken({
    sub: 'dev_user_001',
    email: 'dev@test.com',
    name: 'Usuario Demo',
  });

  return NextResponse.json({
    token,
    user: {
      id: 'dev_user_001',
      email: 'dev@test.com',
      name: 'Usuario Demo',
    },
  });
}
