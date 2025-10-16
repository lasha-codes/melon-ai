import prisma from '@/db/prisma'
import bcrypt from 'bcryptjs'

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
