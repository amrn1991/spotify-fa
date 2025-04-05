import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']

export async function middleware(req: NextRequest) {

  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token: any = (await cookies()).get('FAR_ACCESS_TOKEN')

    if (!token) {
      return NextResponse.rewrite(new URL('/signin', req.url))
    }
  }
}