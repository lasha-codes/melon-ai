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
