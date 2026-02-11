import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production-min-32-chars'
);

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export async function createToken(
  payload: Omit<TokenPayload, 'iat' | 'exp'>
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthFromRequest(
  request: NextRequest
): Promise<TokenPayload | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return verifyToken(authHeader.substring(7));
}

export function unauthorizedResponse(message = 'No autorizado') {
  return NextResponse.json({ error: message }, { status: 401 });
}
