import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import axios from 'axios'
import AuthProvider from '@/context/AuthContext'
import Protect from '@/components/protect'
import GlobalProvider from '@/context/GlobalContext'

const fontInter = Inter({
  variable: '--font-geist-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title:
    'Meon.AI — Smart AI Chatbot for Conversations, Productivity & Creativity',
  description:
    'Meon.AI is your intelligent chatbot powered by advanced AI technology. Chat naturally, boost productivity, and get instant answers, ideas, and creative help — anytime, anywhere.',
  keywords: [
    'AI chatbot',
    'chatbot app',
    'AI assistant',
    'Meon AI',
    'smart chatbot',
    'AI conversation',
    'AI productivity tool',
    'GPT chatbot',
    'Next.js chatbot',
    'AI for creativity',
  ],
  authors: [{ name: 'Meon.AI Team', url: 'https://meonai.vercel.app' }],
  openGraph: {
    title: 'Meon.AI — Next-Gen AI Chatbot for Smarter Conversations',
    description:
      'Experience human-like conversations, creative writing, and instant answers with Meon.AI — the intelligent chatbot built to supercharge your workflow.',
    url: 'https://meonai.vercel.app',
    siteName: 'Meon.AI',
    images: [
      {
        url: 'https://meonai.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meon.AI - Smart AI Chatbot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meon.AI — Smart AI Chatbot',
    description:
      'Chat with Meon.AI — your intelligent assistant for creativity, learning, and productivity.',
    creator: '@meonai',
    images: ['https://meonai.vercel.app/og-image.jpg'],
  },
  metadataBase: new URL('https://meonai.vercel.app'),
  alternates: {
    canonical: 'https://meonai.vercel.app',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

  return (
    <html lang='en'>
      <AuthProvider>
        <Protect>
          <GlobalProvider>
            <body className={`${fontInter.className} antialiased`}>
              {children}
            </body>
          </GlobalProvider>
        </Protect>
      </AuthProvider>
    </html>
  )
}
