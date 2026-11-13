'use client';

import React, { useEffect, useRef } from 'react';

export interface TelemetryPoint {
  timestamp: number;
  value: number;
  isSynthesized: boolean;
}

interface LiveTelemetryCanvasProps {
  dataPoints: TelemetryPoint[];
  unit?: string;
  minValue?: number;
  maxValue?: number;
  currentValue?: number;
  isSynthesized?: boolean;
  confidenceScore?: number;
}

export const LiveTelemetryCanvas: React.FC<LiveTelemetryCanvasProps> = ({
  dataPoints,
  unit = '°C',
  minValue = 20,
  maxValue = 65,
  currentValue = 42.5,
  isSynthesized = false,
  confidenceScore = 0.964,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Support Retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Pristine White Canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Subtle Apple Hairline Grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    const numGridLines = 4;
    for (let i = 1; i < numGridLines; i++) {
      const y = (height / numGridLines) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (dataPoints.length > 1) {
      const step = width / (dataPoints.length - 1);

      for (let i = 0; i < dataPoints.length - 1; i++) {
        const p1 = dataPoints[i];
        const p2 = dataPoints[i + 1];

        const y1 = height - ((p1.value - minValue) / (maxValue - minValue)) * height;
        const y2 = height - ((p2.value - minValue) / (maxValue - minValue)) * height;

        ctx.beginPath();
        // Normal Apple Blue vs. Electric Phantom Purple
        ctx.strokeStyle = p2.isSynthesized ? '#AF52DE' : '#007AFF';
        ctx.lineWidth = p2.isSynthesized ? 2.8 : 2.0;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(i * step, y1);
        ctx.lineTo((i + 1) * step, y2);
        ctx.stroke();
      }

      // Draw current pulse point
      const lastPoint = dataPoints[dataPoints.length - 1];
      const lastX = width;
      const lastY = height - ((lastPoint.value - minValue) / (maxValue - minValue)) * height;

      ctx.beginPath();
      ctx.arc(lastX - 4, lastY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = lastPoint.isSynthesized ? '#AF52DE' : '#007AFF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
    }
  }, [dataPoints, minValue, maxValue]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 transition-all">
      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Primary Telemetry Bus (50Hz Stream)
            </span>
            {isSynthesized ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 pulse-phantom">
                AI Phantom Sensor Active ({Math.round(confidenceScore * 100)}% Confidence)
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Physical Sensor Nominal (100% SLA)
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {currentValue.toFixed(2)}
            </span>
            <span className="text-lg font-medium text-slate-400">{unit}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Sampling Rate</div>
          <div className="text-sm font-semibold text-slate-700">50.0 Hz (20ms)</div>
        </div>
      </div>

      <div className="relative w-full h-40 overflow-hidden rounded-2xl bg-white border border-slate-100">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="flex justify-between items-center mt-2.5 text-xs text-slate-400 font-medium">
        <span>-60.0s (Ring Buffer Origin)</span>
        <span>Sub-15ms Detection Latency</span>
        <span>Now (Live 0ms)</span>
      </div>
    </div>
  );
};

