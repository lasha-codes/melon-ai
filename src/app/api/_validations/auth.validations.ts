import prisma from '@/db/prisma'

export const validateRegister = async ({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}) => {
  if (!username || !email || !password) {
    return { message: 'All of the fields are required!' }
  }

  if (password.length < 6) {
    return { message: 'Password must contain least 6 letters.' }
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return { message: 'User already exists try to login instead.' }
  }

  return { message: null }
}

export const validateLogin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  if (!email || !password) {
    return { message: 'All of the fields are required!' }
  }

  if (password.length < 6) {
    return { message: 'Password must contain least 6 letters.' }
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    return { message: 'User does not exist try to signup instead.' }
  }

  return { message: null }
}
