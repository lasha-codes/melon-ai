'use client'

import Image from 'next/image'
import logo from '../../public/logo.webp'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { GoArrowUp } from 'react-icons/go'

const Chat = () => {
  const { auth } = useContext(AuthContext)
  const [prompt, setPrompt] = useState<string>('')

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

      <form className='w-[600px] bg-white rounded-xl flex flex-col items-start border border-black/10 p-5'>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type a message.'
          className='resize-none w-full outline-none border-none ring-none'
          rows={1}
        />

        <div className='w-full flex items-center justify-end'>
          <button
            disabled={!prompt}
            type='submit'
            className='flex items-center justify-center gap-1 py-2 w-[100px] text-sm bg-[#ffa516] hover:bg-[#f59c0d] transition-all duration-100 text-white rounded-md cursor-pointer'
          >
            Send
            <GoArrowUp className='text-[17px]' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
