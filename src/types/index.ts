import { Chat, Message, User } from '@prisma/client'

export interface JwtValues {
  id: string
  email: string
}

export interface AiChatModel extends Chat {
  message: Message[]
  user: User
}
