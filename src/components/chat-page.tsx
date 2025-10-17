'use client'

import { getAIChatService, getAiResponse } from '@/services/ai'
import { AiChatModel } from '@/types'
import { useEffect, useState } from 'react'
import ButtonLoader from './ui/button-loader'
import { GoArrowUp } from 'react-icons/go'
import AiLoader from './ui/ai-loader'
import Image from 'next/image'
import logo from '../../public/logo.webp'

interface ChatPageProps {
  chatId: string
}

interface MessageProps {
  content: string
  sender: 'USER' | 'AI'
  username: string
}

const LoadingChat = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <h3 className='text-3xl font-bold bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
        Loading Chat...
      </h3>
    </div>
  )
}

const Message = ({ content, sender, username }: MessageProps) => {
  return sender === 'USER' ? (
    <div className='flex items-start gap-3 w-full justify-end'>
      <p className='max-w-[70%] bg-[#F6F6F6] p-2.5 rounded-lg text-[15px] text-black/70'>
        {content}
      </p>

      <div className='text-white rounded-full text-sm min-w-[30px] max-w-[30px] h-[30px] bg-[#ffa516] flex items-center justify-center'>
        {username?.charAt(0)}
      </div>
    </div>
  ) : (
    <div className='flex items-start gap-3 w-full justify-start'>
      <div className='w-[30px] h-[30px] rounded-full border border-black/10 relative'>
        <Image src={logo} alt='melonai icon' fill className='object-contain' />
      </div>

      <p className='max-w-[70%] bg-[#F6F6F6] p-2.5 rounded-lg text-[15px] text-black/70'>
        {content}
      </p>
    </div>
  )
}

const ChatPage = ({ chatId }: ChatPageProps) => {
  const [chat, setChat] = useState<AiChatModel | undefined>(undefined)
  const [loadingChat, setLoadingChat] = useState<boolean>(true)
  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiResponseLoading, setAiResponseLoading] = useState<boolean>(false)

  useEffect(() => {
    getAIChatService(chatId).then((chatModel) => {
      setChat(chatModel)
      setLoadingChat(false)

      if (chatModel?.message?.length === 1) {
        setAiResponseLoading(true)

        getAiResponse({ chatId, prompt: chatModel!.message[0].content }).then(
          (message) => {
            if (message) {
              setChat((prev) => ({
                ...prev!,
                message: [...prev!.message, message],
              }))
            }
            setAiResponseLoading(false)
          }
        )
      }
    })
  }, [chatId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return loadingChat ? (
    <LoadingChat />
  ) : (
    <div className='w-full flex flex-col items-start gap-5 justify-start h-screen overflow-auto p-8 relative'>
      <>
        {chat?.message
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((message) => {
            return (
              <Message
                key={message.id}
                sender={message.sender}
                content={message.content}
                username={chat.user.username}
              />
            )
          })}

        {aiResponseLoading && <AiLoader />}
      </>

      <form
        onSubmit={handleSubmit}
        className='w-[80%] max-xl:w-full mx-auto bg-white rounded-xl flex flex-col items-start border border-black/10 p-5 sticky mt-auto z-[20]'
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
            disabled={!prompt || loading || aiResponseLoading}
            type='submit'
            className='flex items-center justify-center gap-1 h-[37px] w-[100px] text-sm bg-[#ffa516] hover:bg-[#f59c0d] transition-all duration-100 text-white rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-default'
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              <div className='flex items-center gap-0.5'>
                Send
                <GoArrowUp className='text-[17px]' />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatPage
