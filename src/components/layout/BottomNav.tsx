'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Layers, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/app', label: 'Feed', icon: Home },
  { href: '/app/packs', label: 'Packs', icon: Layers },
  { href: '/app/profile', label: 'Perfil', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 blur-nav">
      <div className="flex items-center justify-around h-20 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href !== '/app' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all',
                active ? 'text-primary scale-105' : 'text-soft-black/35'
              )}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
