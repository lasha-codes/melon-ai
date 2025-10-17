'use client'

import Image from 'next/image'
import logo from '../../public/logo.webp'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { GoArrowUp } from 'react-icons/go'
import ButtonLoader from './ui/button-loader'
import { useRouter } from 'next/navigation'
import { createAiChatService } from '@/services/ai'

const Chat = () => {
  const { auth } = useContext(AuthContext)
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
    <div className='w-full flex flex-col items-center gap-5 text-[#292929]'>
      <div className='w-full flex flex-col items-center'>
        <Image
          src={logo}
          alt='logo'
          width={100}
          height={100}
          className='object-contain'
        />

        <h3 className='text-2xl font-medium'>
          <span className='bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
            Howdey there, {auth?.username || 'Guest'}
          </span>
        </h3>

        <h3 className='text-2xl font-medium opacity-50'>
          How can I help you today?
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-[600px] bg-white rounded-xl flex flex-col items-start border border-black/10 p-5'
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type a message.'
          className='resize-none w-full outline-none border-none ring-none'
          rows={1}
        />

        <div className='w-full flex items-center justify-end'>
          <button
            disabled={!prompt || loading}
            type='submit'
            className='flex items-center justify-center gap-1 h-[37px] w-[100px] text-sm bg-[#ffa516] hover:bg-[#f59c0d] transition-all duration-100 text-white rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-default'
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
  )
}

export default Chat
