'use client'

import { Suspense } from 'react'
import Chat from '@/components/chat'
import ChatPage from '@/components/chat-page'
import Sidebar from '@/components/sidebar'
import { useSearchParams } from 'next/navigation'

const HomeContent = () => {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('chat-id')

  return (
    <div className='w-full flex items-center bg-[#FCFBFB]'>
      <Sidebar />
      {chatId ? <ChatPage chatId={chatId} /> : <Chat />}
    </div>
  )
}

const Home = () => {
  return (
    <Suspense fallback={<div className='text-center p-4'>Loading chat...</div>}>
      <HomeContent />
    </Suspense>
  )
}

export default Home
