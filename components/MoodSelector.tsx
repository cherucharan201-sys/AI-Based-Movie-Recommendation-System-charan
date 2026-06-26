'use client';

import { useState } from 'react';
import { MOODS } from '@/types';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  selectedMood?: string;
}

export function MoodSelector({ onMoodSelect, selectedMood }: MoodSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">What's your mood?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(MOODS).map(([key, mood]) => (
          <button
            key={key}
            onClick={() => onMoodSelect(key)}
            className={`p-4 rounded-lg transition-all transform hover:scale-105 ${
              selectedMood === key
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white scale-105'
                : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-semibold">{mood.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
