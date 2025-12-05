import { Play, Pause, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface MobileHeaderProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onFilterClick: () => void;
  delayCount: number;
  totalLines: number;
}

export function MobileHeader({
  isRunning,
  onToggle,
  onReset,
  onFilterClick,
  delayCount,
  totalLines,
}: MobileHeaderProps) {
  return (
    <div className="bg-white px-4 pb-3 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-gray-900">NYC Subway</h1>
          <p className="text-gray-500">Live Status</p>
        </div>
        <button
          onClick={onFilterClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onToggle}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isRunning
              ? 'bg-orange-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">{totalLines - delayCount} On Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">{delayCount} Delayed</span>
        </div>
      </div>
    </div>
  );
}
