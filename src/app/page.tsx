'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Header } from './components/Header';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 transition-colors duration-300">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-md w-full text-center transition-colors"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Restaurant Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>

          <h1 className="text-2xl font-bold mb-2">Welcome to Sakura 🍜</h1>
          <p className="text-gray-700 mb-6">
            I’m your AI assistant. Ready to take your order when you are.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/chat')}
            className="bg-rose-500 text-white text-lg font-medium px-6 py-3 rounded-full shadow hover:bg-rose-600 transition"
          >
            Start Ordering
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
