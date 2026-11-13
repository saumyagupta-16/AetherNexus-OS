'use client';

import React, { useState } from 'react';
import { Mic, Send, Bot, Sparkles, Check } from 'lucide-react';

interface StarkVoiceCopilotProps {
  onSendCommand: (transcript: string) => Promise<string>;
}

export const StarkVoiceCopilot: React.FC<StarkVoiceCopilotProps> = ({ onSendCommand }) => {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('Stark Copilot online. Ready for natural language cyber-physical directives.');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!transcript.trim()) return;

    setIsProcessing(true);
    try {
      const response = await onSendCommand(transcript);
      setReply(response);
      setTranscript('');
    } finally {
      setIsProcessing(false);
    }
  };

  const quickPrompts = [
    'Stark, simulate wire-pull failover on GPIO 4',
    'Stark, run universal diagnostic MRI',
    'Stark, detect RF intruder via GhostRadar',
    'Stark, reset and normalize all systems',
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Stark Autonomous Voice Copilot</h3>
            <p className="text-xs text-slate-500">Tier 2 LangGraph Natural Language Dispatcher</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Supervisor Online
        </span>
      </div>

      {/* Copilot Response Capsule */}
      <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 flex items-start gap-3">
        <Bot className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-700 leading-relaxed font-medium">{reply}</p>
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Speak or type: 'Stark, run diagnostic MRI'..."
          className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className="p-2 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-1.5">
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => {
              setTranscript(q);
            }}
            className="text-[11px] font-medium text-slate-500 bg-slate-100/80 hover:bg-slate-200/80 px-2.5 py-1 rounded-xl transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

