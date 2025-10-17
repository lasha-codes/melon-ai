import './ai-loader.css'
import logo from '../../../public/logo.webp'
import Image from 'next/image'

const AiLoader = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-[30px] h-[30px] rounded-full border border-black/10 relative'>
        <Image src={logo} alt='melonai icon' fill className='object-contain' />
      </div>
      <div className='ai-loader' />
    </div>
  )
}

export default AiLoader
