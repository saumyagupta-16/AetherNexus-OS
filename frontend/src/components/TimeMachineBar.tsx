'use client';

import React, { useState } from 'react';
import { History, Play, RotateCcw, Sparkles } from 'lucide-react';

interface TimeMachineBarProps {
  onScrub: (offsetSeconds: number) => void;
  onSimulateFix: () => void;
  isRewound: boolean;
  onLiveResume: () => void;
}

export const TimeMachineBar: React.FC<TimeMachineBarProps> = ({
  onScrub,
  onSimulateFix,
  isRewound,
  onLiveResume,
}) => {
  const [offset, setOffset] = useState<number>(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setOffset(val);
    onScrub(val);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-3xl">
      <div className="apple-glass-elevated rounded-full px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-slate-100 text-slate-700">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              Time-Machine Scrubber
              {isRewound ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                  Rewound -{offset.toFixed(1)}s
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live (0ms)
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">60-Second In-Memory Ring Buffer</div>
          </div>
        </div>

        {/* Scrub Slider */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-[10px] font-medium text-slate-400">-60s</span>
          <input
            type="range"
            min="0"
            max="60"
            step="0.1"
            value={offset}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[10px] font-medium text-slate-400">Now</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isRewound ? (
            <>
              <button
                onClick={onSimulateFix}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simulate Fix
              </button>
              <button
                onClick={() => {
                  setOffset(0);
                  onLiveResume();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Live
              </button>
            </>
          ) : (
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Drag to rewind</span>
          )}
        </div>
      </div>
    </div>
  );
};

