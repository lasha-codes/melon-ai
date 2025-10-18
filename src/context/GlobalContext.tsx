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
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<ContextType>({
  chats: [],
  setChats: () => [],
  chatsLoading: true,
  setChatsLoading: () => true,
  sidebarOpen: true,
  setSidebarOpen: () => true,
})

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<
    { name: string; id: string; createdAt: Date }[]
  >([])
  const [chatsLoading, setChatsLoading] = useState<boolean>(true)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    getAiChatsService().then((chatsResponse) => {
      setChats(chatsResponse)
      setChatsLoading(false)
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        chats,
        setChats,
        chatsLoading,
        setChatsLoading,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
