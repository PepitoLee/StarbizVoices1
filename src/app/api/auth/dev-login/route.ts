import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const token = await createToken({
    sub: 'demo_user_001',
    email: 'demo@starbizvoice.com',
    name: 'Usuario Demo',
  });

  return NextResponse.json({
    token,
    user: {
      id: 'demo_user_001',
      email: 'demo@starbizvoice.com',
      name: 'Usuario Demo',
    },
  });
}
