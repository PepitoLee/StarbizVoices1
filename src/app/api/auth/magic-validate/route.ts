import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production-min-32-chars'
);

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token requerido' }, { status: 400 });
    }

    let payload;
    try {
      const result = await jwtVerify(token, JWT_SECRET);
      payload = result.payload as { email: string; type: string };
    } catch {
      return NextResponse.json({ error: 'Enlace invalido o expirado' }, { status: 401 });
    }

    if (payload.type !== 'magic_link' || !payload.email) {
      return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
    }

    // Create session token (7 days)
    const sessionToken = await createToken({
      sub: `user_${payload.email.replace(/[^a-z0-9]/g, '_')}`,
      email: payload.email,
      name: '',
    });

    return NextResponse.json({
      token: sessionToken,
      user: {
        id: `user_${payload.email.replace(/[^a-z0-9]/g, '_')}`,
        email: payload.email,
        name: '',
      },
    });
  } catch (error) {
    console.error('Magic validate error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
