import { Message } from '@prisma/client'
import axios from 'axios'

export const createAiChatService = async ({
  prompt,
  token,
}: {
  prompt: string
  token: string
}) => {
  const { data } = await axios.post(
    '/api/ai/chat',
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data?.chat
}

export const getAIChatService = async (id: string) => {
  const token = localStorage.getItem('melonai-jwt-token')
  if (!token) return undefined

  const { data } = await axios.get(`/api/ai/chat/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data?.chat
}

export const getAiResponse = async ({
  chatId,
  prompt,
}: {
  chatId: string
  prompt: string
}) => {
  const token = localStorage.getItem('melonai-jwt-token')
  if (!token) return null

  const { data } = await axios.post('/api/ai/response', {
    chatId,
    prompt,
  })

  return data?.message as Message | undefined
}

export const getAiChatsService = async () => {
  const token = localStorage.getItem('melonai-jwt-token')
  if (!token) return []

  const { data } = await axios.get('/api/ai/chat', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data?.chats || []
}

export const saveUserMessageService = async ({
  prompt,
  chatId,
}: {
  prompt: string
  chatId: string
}) => {
  const token = localStorage.getItem('melonai-jwt-token')
  if (!token) return

  return axios.post(
    '/api/ai/chat/message',
    {
      prompt,
      chatId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
