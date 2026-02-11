import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production-min-32-chars'
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Create magic link token (short-lived: 15min)
    const magicToken = await new SignJWT({
      email: normalizedEmail,
      type: 'magic_link',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_SECRET);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    const magicUrl = `${appUrl}/auth/verify?token=${magicToken}`;

    // Send email via Resend (if configured)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 're_your_resend_api_key') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'StarbizVoice <noreply@starbizacademy.com>',
          to: normalizedEmail,
          subject: 'Tu acceso a StarbizVoice',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1A1A1A;">Hola!</h2>
              <p>Haz clic en el boton para acceder a StarbizVoice:</p>
              <a href="${magicUrl}" style="display: inline-block; background: linear-gradient(135deg, #C8963E, #B8453A); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; margin: 20px 0;">
                Acceder a StarbizVoice
              </a>
              <p style="color: #999; font-size: 12px;">Este enlace expira en 15 minutos.</p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      ...(process.env.NODE_ENV === 'development' ? { magicUrl } : {}),
    });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
