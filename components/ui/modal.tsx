'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with CSS animation */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-modal-backdrop"
        onClick={onClose}
      />
      
      {/* Modal content with CSS animation */}
      <div 
            ref={modalRef}
        className="relative z-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-slate-900 border border-gray-700 rounded-lg shadow-2xl animate-modal-content"
      >
        {/* Close button */}
            <button
              onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20 bg-slate-800/80 rounded-full"
            >
          <X className="w-5 h-5" />
            </button>
            
        {/* Content */}
        <div className="p-6">
            {children}
        </div>
      </div>
    </div>
  );
}