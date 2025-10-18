'use client'

import { getAiChatsService } from '@/services/ai'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react'

interface ContextType {
  chats: { name: string; id: string; createdAt: Date }[]
  setChats: Dispatch<
    SetStateAction<{ name: string; id: string; createdAt: Date }[]>
  >
  chatsLoading: boolean
  setChatsLoading: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<ContextType>({
  chats: [],
  setChats: () => [],
  chatsLoading: true,
  setChatsLoading: () => true,
})

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<
    { name: string; id: string; createdAt: Date }[]
  >([])
  const [chatsLoading, setChatsLoading] = useState<boolean>(true)

  useEffect(() => {
    getAiChatsService().then((chatsResponse) => {
      setChats(chatsResponse)
      setChatsLoading(false)
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={{ chats, setChats, chatsLoading, setChatsLoading }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
