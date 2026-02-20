import { NextRequest, NextResponse } from 'next/server';

// US country code = English, everything else = Spanish
const ENGLISH_COUNTRIES = new Set(['US']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /ventas route
  if (pathname !== '/ventas') {
    return NextResponse.next();
  }

  // Check for manual language override via query param (?lang=en or ?lang=es)
  const langParam = request.nextUrl.searchParams.get('lang');
  if (langParam === 'en') {
    return NextResponse.rewrite(new URL('/ventas-en.html', request.url));
  }
  if (langParam === 'es') {
    return NextResponse.rewrite(new URL('/ventas-es.html', request.url));
  }

  // Vercel injects x-vercel-ip-country header automatically
  const country = request.headers.get('x-vercel-ip-country') || '';

  if (ENGLISH_COUNTRIES.has(country)) {
    return NextResponse.rewrite(new URL('/ventas-en.html', request.url));
  }

  // Default: Spanish for Latin America and everywhere else
  return NextResponse.rewrite(new URL('/ventas-es.html', request.url));
}

export const config = {
  matcher: ['/ventas'],
};
