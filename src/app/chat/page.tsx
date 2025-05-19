'use client';

import { Header } from '@/app/components/Header';
import Chat from '@/app/components/Chat';

export default function ChatPage() {
  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <div className="flex-1 overflow-hidden px-4 pb-4">
        <Chat />
      </div>
    </main>
  );
}
