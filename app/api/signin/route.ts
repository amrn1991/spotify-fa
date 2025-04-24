import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {serialize} from 'cookie'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      'hello',
      {
        expiresIn: '8h',
      }
    )

    return new Response(JSON.stringify(user), {
      headers: {
        'Set-Cookie': serialize('FAR_ACCESS_TOKEN', token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      }
    })
  } else {
    return new Response('ایمیل یا رمط عبور اشتباه وارد شده است', {
      status: 401,
    })
  }
}