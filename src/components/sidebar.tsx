'use client'

import { PiArrowLeftThin } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { IoIosLogOut } from 'react-icons/io'
import Chats from './chats'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

const AuthButtons = () => (
  <div className='w-full flex flex-col items-start gap-2'>
    <Link
      href='/login'
      className='w-full flex items-center justify-center py-2 text-sm bg-[#ffa516] hover:bg-[#f59c0d] transition-all duration-100 text-white rounded-lg'
    >
      Login
    </Link>

    <Link
      href='/signup'
      className='w-full flex items-center justify-center py-2 text-sm bg-transparent border border-gray-800/5 text-gray-800/50 transition-all duration-100 hover:border-black/10 rounded-lg'
    >
      Sign up
    </Link>
  </div>
)

const Sidebar = () => {
  const { auth, setAuth, loading } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('melonai-jwt-token')
    setAuth(() => undefined)
    window.location.reload()
  }

  return (
    <div className='min-w-[300px] max-w-[300px] bg-[#F8F7F6] h-screen flex flex-col items-center justify-between border-r border-gray-500/5 text-[#292929] z-[20]'>
      <div className='w-full flex flex-col items-start gap-4 px-4  py-4'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-xl font-semibold bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
            Melon.AI
          </h1>

          <button className='text-lg cursor-pointer'>
            <PiArrowLeftThin />
          </button>
        </div>

        <button className='w-full rounded-lg border border-black/10 flex items-center gap-2 hover:border-black/20 transition-all duration-100 bg-white cursor-pointer px-3 py-[7px]'>
          <AiOutlinePlus className='text-sm' />
          <span className='text-sm font-medium'>New Chat</span>
        </button>

        <div className='w-full flex gap-1.5 items-center opacity-90 mt-5'>
          <HiOutlineMail className='text-[17px]' />
          <span className='text-sm'>Chats</span>
        </div>

        <Chats />
      </div>

      <div className='p-4 border-t border-gray-800/5 w-full'>
        {loading ? (
          <div className='w-full h-full flex items-center justify-center text-xl font-semibold text-[#ffa516]'>
            ...
          </div>
        ) : !auth ? (
          <AuthButtons />
        ) : (
          <div className='w-full flex flex-col items-start gap-2'>
            <div className='w-full flex items-center gap-2'>
              <div className='text-white rounded-full text-sm min-w-[30px] max-w-[30px] h-[30px] bg-[#ffa516] flex items-center justify-center'>
                {auth.username?.charAt(0)}
              </div>

              <div className='w-full flex flex-col items-start'>
                <h3 className='text-[15px] font-medium'>{auth.username}</h3>
                <h4 className='text-[12px] -mt-0.5 opacity-60'>{auth.email}</h4>
              </div>
            </div>

            <button
              onClick={logout}
              className='flex justify-start items-center gap-2 bg-white text-sm rounded-lg px-6 py-1.5 cursor-pointer border border-gray-800/10 hover:border-black/20 transition-all duration-100'
            >
              Logout
              <IoIosLogOut className='text-base' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
