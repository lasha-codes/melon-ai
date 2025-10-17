import prisma from '@/db/prisma'
import { JwtValues } from '@/types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUserService = async ({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}) => {
  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return user
}

export const loginUserService = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  const passwordMatches = bcrypt.compareSync(password, user!.password)

  if (!passwordMatches) {
    return { message: 'Incorrect password provided.', user: null }
  }

  return { user, message: null }
}

export const getUserService = async (token: string) => {
  const { id, email } = jwt.verify(token, process.env.JWT_SECRET!) as JwtValues

  const user = await prisma.user.findFirst({
    where: {
      id,
      email,
    },
  })

  return user
}
