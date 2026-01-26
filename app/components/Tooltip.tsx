'use client';

import { motion } from 'framer-motion';

export function Tooltip({ 
  children, 
  text 
}: { 
  children: React.ReactNode; 
  text: string;
}) {
  return (
    <div className="group relative">
      {children}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        className="absolute bottom-full right-0 mb-2 hidden group-hover:block"
      >
        <div className="rounded-md bg-black/80 px-2 py-1 text-sm text-white">
          {text}
        </div>
      </motion.div>
    </div>
  );
}