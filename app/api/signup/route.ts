import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync()
  const { email, password } = await req.json()

  let user

  try {
    user = await prisma.user.create({
      data: {
        firstName: `User ${bcrypt.genSaltSync(5)}`,
        lastName: bcrypt.genSaltSync(5),
        email,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (e) {
    return new Response('کاربر قبلا ثبت نام کرده است', {
      status: 401,
    })
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8h' }
  )
  
  return new Response(JSON.stringify(user), {
    headers: {
      'Set-Cookie': cookie.serialize('FAR_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }
  })

}