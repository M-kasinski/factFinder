"use client";

import { useChat } from '@ai-sdk/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

// Define stable chat options to avoid recreating object on each render
const CHAT_OPTIONS = { api: '/api/chatGroq' } as const;

export default function ChatPage() {
  const router = useRouter();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    reload,
    setMessages,
  } = useChat(CHAT_OPTIONS);

  return (
    <div className="flex flex-col h-screen w-full mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-4 flex-shrink-0">
        {/* Left Group: Back Button + Title */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="hover:bg-primary/10 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <div className="flex items-center gap-4"> {/* Removed flex-grow justify-center */} 
            <Image
              src="/spiral_svg.svg"
              alt="ClaireVue Logo"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Chatbot
            </h1>
          </div>
        </div>

        {/* Conditional Clear Button (remains on the right due to justify-between) */} 
        {messages.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMessages([])}
            className="hover:bg-destructive/10 rounded-full"
            aria-label="Effacer la conversation"
          >
            <X className="h-5 w-5 text-destructive" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 max-w-3xl w-full mx-auto pb-24">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={message.role === 'assistant' ? 'flex' : 'flex justify-end'}
          >
            {message.role === 'assistant' ? (
              <Card className="p-4 bg-card/90 backdrop-blur-sm">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Card>
            ) : (
              <div className="rounded-full bg-primary/20 text-primary px-4 py-2">
                {message.content}
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator shown ONLY when submitted (before streaming starts) */}
        {status === 'submitted' && (
          <div className="flex"> {/* Mimic assistant message alignment */}
            <Card className="p-4 bg-card/90 backdrop-blur-sm inline-flex items-center space-x-1.5">
              {/* Animated dots */}
              <span className="animate-bounce delay-0 duration-1000 inline-block w-2 h-2 bg-primary rounded-full"></span>
              <span className="animate-bounce delay-150 duration-1000 inline-block w-2 h-2 bg-primary rounded-full"></span>
              <span className="animate-bounce delay-300 duration-1000 inline-block w-2 h-2 bg-primary rounded-full"></span>
            </Card>
          </div>
        )}
      </div>

      {/* Error and retry */}
      {error && (
        <div className="max-w-3xl mx-auto text-red-600 mb-4 flex-shrink-0">
          Une erreur est survenue.{' '}
          <Button size="sm" onClick={() => reload()}>
            Réessayer
          </Button>
        </div>
      )}

      {/* Input at bottom */}
      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
        <div className="relative max-w-3xl mx-auto flex items-center gap-2">
          <div className="relative flex-grow rounded-full border backdrop-blur-sm border-input hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-background/80">
            <input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="Posez une question..."
              disabled={status !== 'ready'}
              className="w-full py-3.5 pl-5 pr-16 rounded-full focus:outline-none text-lg bg-transparent"
              autoComplete="off"
              inputMode="text"
            />
            <button
              type="submit"
              disabled={status !== 'ready'}
              className="absolute inset-y-0 right-1.5 p-2 hover:bg-primary/10 rounded-full transition-colors"
              aria-label="Envoyer"
            >
              <Send className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 