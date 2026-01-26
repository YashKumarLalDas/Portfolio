'use client';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = {
    primary: 'bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30',
    secondary: 'bg-white/10 border border-white/20 hover:bg-white/20',
    ghost: 'hover:bg-white/10',
  };

  return (
    <button
      className={cn(
        'rounded-full px-5 py-2 transition',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        baseStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}