'use client'

import type React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { GoArrowUp } from 'react-icons/go'
import ButtonLoader from './ui/button-loader'
import { useRouter } from 'next/navigation'
import { createAiChatService } from '@/services/ai'
import { GlobalContext } from '@/context/GlobalContext'
import LogoCanvas from './ui/logo-canvas'

const Chat = () => {
  const { auth } = useContext(AuthContext)
  const { setChats } = useContext(GlobalContext)
  const router = useRouter()
  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      const token = localStorage.getItem('melonai-jwt-token')
      if (!auth || !token) {
        return router.push('/login')
      }
      setLoading(true)

      const chat = await createAiChatService({ prompt, token })

      if (chat) {
        setChats((prev) => {
          return [
            ...prev,
            {
              name: chat.name as string,
              id: chat.id as string,
              createdAt: chat.createdAt as unknown as Date,
            },
          ]
        })
        router.push(`/?chat-id=${chat.id}`)
      }

      setLoading(false)
      setPrompt('')
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className='relative w-full min-h-screen flex flex-col overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
          <div className='absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
          <div className='absolute -bottom-8 left-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />

          <div className='absolute top-1/4 left-1/3 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000' />
          <div className='absolute bottom-1/4 right-1/4 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-3000' />

          <div className='absolute top-1/3 right-1/3 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-lg animate-blob animation-delay-500' />
          <div className='absolute bottom-1/3 left-1/4 w-36 h-36 bg-orange-200 rounded-full mix-blend-multiply filter blur-lg animate-blob animation-delay-1500' />
          <div className='absolute top-2/3 right-1/2 w-28 h-28 bg-yellow-200 rounded-full mix-blend-multiply filter blur-lg animate-blob animation-delay-2500' />
          <div className='absolute top-1/2 left-1/2 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-lg animate-blob animation-delay-3500' />

          <div className='absolute top-20 left-1/2 w-20 h-20 bg-orange-300 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-700' />
          <div className='absolute bottom-32 right-1/3 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-1800' />
          <div className='absolute top-1/2 right-20 w-20 h-20 bg-amber-200 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-2800' />
          <div className='absolute bottom-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-3800' />
          <div className='absolute top-3/4 left-1/4 w-20 h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4500' />
        </div>
      </div>

      <div className='relative flex-1 w-full flex items-center justify-center max-md:p-5 py-12'>
        <div className='w-full flex flex-col items-center gap-5 text-[#292929]'>
          <div className='w-full flex flex-col items-center'>
            <LogoCanvas />

            <h3 className='text-2xl font-medium max-md:text-[30px]'>
              <span className='bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
                Howdey there, {auth?.username || 'Guest'}
              </span>
            </h3>

            <h3 className='text-2xl font-medium opacity-50 max-md:text-[22px]'>
              How can I help you today?
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className='w-[600px] bg-white/80 backdrop-blur-md rounded-xl flex flex-col items-start border border-orange-200/50 p-5 shadow-xl shadow-orange-100/50 max-md:w-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-200/50'
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Type a message.'
              className='resize-none w-full outline-none border-none ring-none bg-transparent'
              rows={2}
            />

            <div className='w-full flex items-center justify-end'>
              <button
                disabled={!prompt || loading}
                type='submit'
                className='flex items-center justify-center gap-1 h-[37px] w-[100px] text-sm bg-gradient-to-r from-[#ffa616da] to-[#ff7b00d8] hover:from-[#ff9500e5] hover:to-[#ff6a00e8] transition-all duration-200 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-default shadow-lg shadow-orange-300/30'
              >
                {loading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    Send
                    <GoArrowUp className='text-[17px]' />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className='relative w-full py-6 text-center'>
        <p className='text-sm text-gray-600'>
          © {new Date().getFullYear()} MelonAI. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Chat
