import jwt from 'jsonwebtoken'
import prisma from './prisma'
import { cookies } from 'next/headers'

export const validateRoute = async () => {
  const { value }: any = (await cookies()).get('FAR_ACCESS_TOKEN')
  if (value) {
    let user, playlistsCount

    try {
      const { id }: any = jwt.verify(value, 'hello');
      user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new Error('کاربری با این مشخصات وجود ندارد')
      }

      playlistsCount = await prisma.playlist.count({
        where: {
          userId: user.id,
        },
      })
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز' }), { status: 401 })
    }

    return { ...user, playlistsCount }
  }

  return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز' }), { status: 401 })
}

export const validateToken = (token: any) => {
  const user = jwt.verify(token, 'hello')
  return user
}