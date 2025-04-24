import prisma from '@/lib/prisma'
import { validateRoute } from '@/lib/auth'

export async function GET(req: Request) {
  const user: any = await validateRoute()

  if(!user){
    return new Response('اجازه دسترسی ندارید', {
      status: 403,
    })
  }

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return new Response(JSON.stringify(playlists))
}
