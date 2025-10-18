'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const ChatsList = ({
  chats,
}: {
  chats: { id: string; name: string; createdAt: Date }[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedChatId = searchParams.get('chat-id')

  return (
    <div className='w-full flex flex-col items-start gap-2'>
      {chats
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((chat) => (
          <button
            onClick={() => router.push(`/?chat-id=${chat.id}`)}
            key={chat.id}
            className={`w-full line-clamp-1 bg-white border border-black/5 px-5 py-1.5 rounded-lg text-start cursor-pointer hover:bg-[#FFC05B]/20 hover:border-black/10 transition-all duration-100 ${
              selectedChatId === chat.id && '!border-black/10 !bg-[#FFC05B]/20'
            }`}
          >
            <span className='text-sm'>{chat.name.replaceAll('*', '')}</span>
          </button>
        ))}
    </div>
  )
}

const Chats = ({
  chats,
}: {
  chats: { name: string; id: string; createdAt: Date }[]
}) => {
  return (
    <div className='w-full flex flex-col items-start gap-2 h-[400px]'>
      {!chats.length ? (
        <div className='w-full min-h-full flex items-center justify-center'>
          <h3 className='opacity-30 font-semibold text-[13px]'>
            No Chat History
          </h3>
        </div>
      ) : (
        <ChatsList chats={chats} />
      )}
    </div>
  )
}

export default Chats
