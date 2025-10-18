'use client'

import { PiArrowLeftThin } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { IoIosLogOut, IoMdArrowForward } from 'react-icons/io'
import Chats from './chats'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { GlobalContext } from '@/context/GlobalContext'

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
  const { chats, sidebarOpen, setSidebarOpen } = useContext(GlobalContext)

  const logout = () => {
    localStorage.removeItem('melonai-jwt-token')
    setAuth(() => undefined)
    window.location.reload()
  }

  return (
    <>
      {!sidebarOpen && (
        <>
          <div className='flex justify-start h-screen pl-5 pt-5 max-md:hidden'>
            <div className='flex items-center gap-2.5 h-fit'>
              <Link
                href='/'
                className='h-[35px] w-[35px] border flex items-center justify-center rounded-md cursor-pointer hover:border-black/25 transition-all duration-100'
              >
                <AiOutlinePlus className='text-sm' />
              </Link>
              <button
                onClick={() => setSidebarOpen(true)}
                className='h-[35px] w-[35px] border flex items-center justify-center rounded-md cursor-pointer hover:border-black/25 transition-all duration-100'
              >
                <IoMdArrowForward className='text-sm' />
              </button>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className='h-[35px] w-[35px] border items-center justify-center rounded-md cursor-pointer hover:border-black/25 transition-all duration-100 fixed z-[10] top-5 left-5 hidden max-md:flex'
          >
            <IoMdArrowForward className='text-sm' />
          </button>
        </>
      )}
      <div
        className={`min-w-[300px] max-w-[300px] max-md:min-w-[75%] max-md:max-w-[70%] bg-[#F8F7F6] h-screen flex flex-col items-center justify-between border-r border-gray-500/5 text-[#292929] z-[50] max-md:fixed max-md:bottom-0 transition-all duration-300 ${
          !sidebarOpen
            ? 'md:hidden max-md:-translate-x-[100%]'
            : 'max-md:-translate-x-0'
        }`}
      >
        <div className='w-full flex flex-col items-start gap-4 px-4 py-4'>
          <div className='w-full flex items-center justify-between'>
            <Link href='/'>
              <h1 className='text-xl font-semibold bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
                Melon.AI
              </h1>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className='text-lg cursor-pointer'
            >
              <PiArrowLeftThin />
            </button>
          </div>

          <Link
            href='/'
            className='w-full rounded-lg border border-black/10 flex items-center gap-2 hover:border-black/20 transition-all duration-100 bg-white cursor-pointer px-3 py-[7px]'
          >
            <AiOutlinePlus className='text-sm' />
            <span className='text-sm font-medium'>New Chat</span>
          </Link>

          <div className='w-full flex gap-1.5 items-center opacity-90 mt-5'>
            <HiOutlineMail className='text-[17px]' />
            <span className='text-sm'>Chats</span>
          </div>

          <Chats chats={chats} />
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
                  <h4 className='text-[12px] -mt-0.5 opacity-60'>
                    {auth.email}
                  </h4>
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

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed w-full h-full top-0 left-0 bg-black ${
          sidebarOpen
            ? 'opacity-50 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } transition-all duration-200 z-[40] md:hidden`}
      />
    </>
  )
}

export default Sidebar
