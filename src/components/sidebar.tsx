import { PiArrowLeftThin } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import Chats from './chats'
import Link from 'next/link'

const AuthButtons = () => (
  <div className='w-full flex flex-col items-start gap-2'>
    <Link
      href='/login'
      className='w-full flex items-center justify-center py-2 text-sm bg-[#292929] hover:bg-[#363636] transition-all duration-100 text-white rounded-lg'
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
  return (
    <div className='w-[270px] bg-[#F8F7F6] h-screen flex flex-col items-center justify-between border-r border-gray-500/5 py-4 text-[#292929] z-[20]'>
      <div className='w-full flex flex-col items-start gap-4 px-4'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-lg font-semibold text-[#292929]'>Melon.AI</h1>
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
        <AuthButtons />
      </div>
    </div>
  )
}

export default Sidebar
