import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'

const Home = () => {
  return (
    <div className='w-full flex items-center gap-10 bg-[#FCFBFB]'>
      <Sidebar />

      <Chat />
    </div>
  )
}

export default Home
