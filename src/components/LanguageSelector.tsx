import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages, LanguageCode } from '../translations';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export function LanguageSelector({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find(l => l.code === language);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors border",
          variant === 'light' 
            ? "bg-white border-emerald-100 text-slate-700 hover:bg-slate-50" 
            : "bg-emerald-800 border-emerald-700 text-white hover:bg-emerald-700"
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{activeLang?.label}</span>
        <span className="sm:hidden">{activeLang?.code.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-emerald-100 overflow-hidden z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as LanguageCode);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm font-medium transition-colors",
                  language === lang.code 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
