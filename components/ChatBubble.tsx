'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ReactNode } from 'react'

interface Props {
  message: string | ReactNode
  sender: 'user' | 'operator'
  timestamp: Date
  isTyping?: boolean
}

export default function ChatBubble({
  message,
  sender,
  timestamp,
  isTyping = false,
}: Props) {
  const isUser = sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm
            ${
              isUser
                ? 'bg-emerald-600 text-white rounded-br-md'
                : 'bg-[#14181F] text-slate-100 border border-[#1E2329] rounded-bl-md'
            }
            ${isTyping ? 'animate-pulse' : ''}
          `}>
          {typeof message === 'string' ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          ) : (
            message
          )}
        </div>

        {/* Timestamp */}
        {!isTyping && (
          <div className={`mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            <span className="text-xs text-slate-400">
              {format(timestamp, 'HH:mm')}
            </span>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        className={`flex-shrink-0 ${isUser ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
            ${
              isUser
                ? 'bg-emerald-900 text-emerald-300'
                : 'bg-[#1E2329] text-slate-300'
            }
          `}>
          {isUser ? 'You' : 'Op'}
        </div>
      </div>
    </motion.div>
  )
}
