'use client';

import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-3 bg-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo.png"
          alt="Sakura"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-gray-900 dark:text-white font-semibold text-lg">
          Sakura
        </span>
      </div>
      <ThemeToggle />
    </header>
  );
}
