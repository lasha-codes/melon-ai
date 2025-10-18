import prisma from '@/db/prisma'
import jwt from 'jsonwebtoken'
import { JwtValues } from '@/types'
import OpenAI from 'openai'

export const createChatService = async ({
  token,
  prompt,
}: {
  token: string
  prompt: string
}) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtValues

  const name = await getAiResponse(
    `Summarize this text into a short chat title (max 3 words, no punctuation): ${prompt}`
  )

  const chat = await prisma.chat.create({
    data: {
      user: {
        connect: {
          id,
        },
      },
      message: {
        create: {
          sender: 'USER',
          content: prompt,
        },
      },
      name,
    },
    include: {
      message: {
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  return chat
}

export const getAiResponse = async (prompt: string) => {
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-oss-20b:freeopenai/gpt-oss-20b:free',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return completion.choices[0].message.content as string
}

export const getChatService = async ({
  token,
  id,
}: {
  token: string
  id: string
}) => {
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtValues

  const chat = await prisma.chat.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      message: {
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      },
      user: true,
    },
  })

  return chat
}

export const createMessageService = async ({
  sender,
  content,
  chatId,
}: {
  sender: 'AI' | 'USER'
  content: string
  chatId: string
}) => {
  const message = await prisma.message.create({
    data: {
      chat: {
        connect: {
          id: chatId,
        },
      },
      sender,
      content,
    },
  })

  return message
}

export const getChatsService = async (token: string) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtValues
  if (!id) {
    return []
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: id,
    },
    select: {
      name: true,
      id: true,
      createdAt: true,
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return chats
}
