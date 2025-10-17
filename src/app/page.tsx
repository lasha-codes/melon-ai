'use client'

import Chat from '@/components/chat'
import ChatPage from '@/components/chat-page'
import Sidebar from '@/components/sidebar'
import { useSearchParams } from 'next/navigation'

const Home = () => {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('chat-id')

  return (
    <div className='w-full flex items-center bg-[#FCFBFB]'>
      <Sidebar />

      {chatId ? <ChatPage chatId={chatId} /> : <Chat />}
    </div>
  )
}

export default Home
