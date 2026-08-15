import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { useLanguage } from '../context/LanguageContext';

export function TextToSpeechButton({ text, className = '' }: { text: string, className?: string }) {
  const { speak, stop, isSpeaking, isSupported } = useTTS();
  const { t } = useLanguage();

  if (!isSupported) return null;

  return (
    <button
      onClick={() => isSpeaking ? stop() : speak(text)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border shadow-sm active:scale-95 ${
        isSpeaking 
          ? "bg-emerald-100 border-emerald-200 text-emerald-800" 
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200"
      } ${className}`}
      title={isSpeaking ? t('stop') : t('listen')}
    >
      {isSpeaking ? (
        <Square className="w-5 h-5 fill-emerald-800" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
      <span>{isSpeaking ? t('stop') : t('listen')}</span>
    </button>
  );
}
