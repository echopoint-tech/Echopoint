import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getInternalPath } from './i18n/routing';

const locales = ['es', 'en', 'fr', 'pt'];
const defaultLocale = 'es';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public files, API, and images
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameLower = pathname.toLowerCase();
  const pathnameHasLocale = locales.some(
    (locale) => pathnameLower.startsWith(`/${locale}/`) || pathnameLower === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    const restOfPath = pathname.substring(locale.length + 1);
    
    // Map translated URL (e.g. /en/services) to internal path (e.g. /en/servicios)
    const internalPath = getInternalPath(locale, restOfPath);
    
    // If the path was translated, rewrite it so Next.js loads the correct folder internally
    if (internalPath !== restOfPath && internalPath !== `/${restOfPath}`) {
      const rewrittenUrl = request.nextUrl.clone();
      rewrittenUrl.pathname = `/${locale}${internalPath}`;
      return NextResponse.rewrite(rewrittenUrl);
    }
    
    return NextResponse.next();
  }

  // Redirect if there is no locale (e.g. /servicios -> /es/servicios)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
