import { rewrite } from '@vercel/functions';

// Only run on the root path — everything else (direct file requests,
// static assets) passes through untouched.
export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const host = request.headers.get('host') || '';

  if (host.startsWith('siyunlee-merchandiser.')) {
    return rewrite(new URL('/amazon.html', request.url));
  }

  if (host.startsWith('siyunlee-influencer-marketer.')) {
    return rewrite(new URL('/influencer.html', request.url));
  }

  if (host === 'siyunlee.vercel.app') {
    return rewrite(new URL('/performance-marketer.html', request.url));
  }

  // Any other host (e.g. the project's default *.vercel.app domain)
  // falls through to the normal static index.html.
}
