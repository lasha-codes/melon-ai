'use client'

import {
  getAIChatService,
  getAiResponse,
  saveUserMessageService,
} from '@/services/ai'
import { AiChatModel } from '@/types'
import { useContext, useEffect, useRef, useState } from 'react'
import ButtonLoader from './ui/button-loader'
import { GoArrowUp } from 'react-icons/go'
import AiLoader from './ui/ai-loader'
import Image from 'next/image'
import logo from '../../public/logo.webp'
import { Message as MessageType } from '@prisma/client'
import { redirect, useSearchParams } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'

interface MessageProps {
  content: string
  sender: 'USER' | 'AI'
  username: string
  animationResponse: string[]
  id: string
  animatingMessageId: string | undefined
}

const LoadingChat = () => {
  return (
    <div className='w-full h-full max-md:h-screen flex items-center justify-center'>
      <h3 className='text-3xl font-bold bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
        Loading Chat...
      </h3>
    </div>
  )
}

const Message = ({
  content,
  sender,
  username,
  animationResponse,
  id,
  animatingMessageId,
}: MessageProps) => {
  return sender === 'USER' ? (
    <div className='flex items-end gap-3 w-full justify-end max-xl:flex-col-reverse'>
      <p className='max-w-[70%] bg-[#F6F6F6] p-2.5 rounded-lg text-[15px] text-black/70 max-xl:max-w-full'>
        {content}
      </p>

      <div className='text-white rounded-full text-sm min-w-[30px] max-w-[30px] h-[30px] bg-[#ffa516] flex items-center justify-center'>
        {username?.charAt(0)}
      </div>
    </div>
  ) : (
    <div className='flex items-start gap-3 w-full justify-start max-xl:flex-col'>
      <div className='w-[30px] h-[30px] rounded-full border border-black/10 relative'>
        <Image src={logo} alt='melonai icon' fill className='object-contain' />
      </div>

      <div className='max-w-[80%] max-xl:max-w-full bg-[#F6F6F6] p-2.5 rounded-lg text-[15px] text-black/70 break-words'>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  wrapLongLines
                  wrapLines
                  PreTag='div'
                  customStyle={{
                    maxWidth: '100%',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {sender === 'AI' && id === animatingMessageId
            ? animationResponse.length
              ? animationResponse.join('')
              : ''
            : content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

const ChatPage = () => {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('chat-id') as string
  const { auth, loading: authLoading } = useContext(AuthContext)
  const [chat, setChat] = useState<AiChatModel | undefined>(undefined)
  const [loadingChat, setLoadingChat] = useState<boolean>(true)
  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiResponseLoading, setAiResponseLoading] = useState<boolean>(false)
  const [animationResponse, setAnimationResponse] = useState<string[]>([])
  const [animatingMessageId, setAnimatingMessageId] = useState<
    string | undefined
  >(undefined)
  const lastMessageRef = useRef<HTMLDivElement>(null)

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
            setAnimatingMessageId(message?.id)
            message?.content.split('').map((letter, idx) => {
              setTimeout(() => {
                setAnimationResponse((prev) => [...prev!, letter])
              }, 20 * idx)
            })
            setAnimationResponse([])
          }
        )
      }
    })
  }, [chatId])

  useEffect(() => {
    if (!authLoading && !auth) {
      return redirect('/login')
    }
  }, [auth, authLoading])

  useEffect(() => {
    if (!chat && !loadingChat) {
      return redirect('/')
    }
  }, [chat, loadingChat])

  const handleSubmit = async (e: React.FormEvent, chatId: string) => {
    e.preventDefault()

    try {
      setLoading(true)

      const mockUserMessage = {
        id: new Date().getTime().toString(),
        content: prompt,
        sender: 'USER',
        createdAt: new Date().toISOString(),
      }

      setChat((prev) => ({
        ...prev!,
        message: [...prev!.message, mockUserMessage as unknown as MessageType],
      }))

      setLoading(false)
      setPrompt('')
      setAiResponseLoading(true)

      await saveUserMessageService({
        chatId: chatId,
        prompt: mockUserMessage.content,
      })

      getAiResponse({ chatId, prompt: mockUserMessage.content }).then(
        (message) => {
          if (message) {
            setChat((prev) => ({
              ...prev!,
              message: [...prev!.message, message],
            }))
          }
          setAiResponseLoading(false)
          setAnimatingMessageId(message?.id)
          message?.content.split('').map((letter, idx) => {
            setTimeout(() => {
              setAnimationResponse((prev) => [...prev!, letter])
            }, 20 * idx)
          })
          setAnimationResponse([])
        }
      )
    } catch (err) {
      setAiResponseLoading(false)
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  return loadingChat ? (
    <LoadingChat />
  ) : (
    <div className='w-full flex flex-col items-start gap-5 justify-start h-screen relative overflow-x-auto'>
      <div className='w-full flex flex-col items-start gap-5 justify-start h-full overflow-auto px-[15%] py-8 max-xl:!p-8 max-md:!px-5 max-md:!py-5'>
        {chat?.message
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((message, idx) => {
            return (
              <Message
                key={message.id}
                sender={message.sender}
                content={message.content}
                username={chat.user.username}
                animationResponse={animationResponse}
                id={message.id}
                animatingMessageId={animatingMessageId}
              />
            )
          })}

        {aiResponseLoading && <AiLoader />}
        <div ref={lastMessageRef} />
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, chatId)}
        className='w-[70%] max-xl:w-[90%] mx-auto bg-white rounded-xl flex flex-col items-start border border-black/10 p-5 sticky bottom-5 z-[20]'
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type a message.'
          className='resize-none w-full outline-none border-none ring-none'
          rows={2}
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
