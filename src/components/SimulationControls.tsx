import { Play, Pause, RotateCcw } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  delayCount: number;
  totalLines: number;
}

export function SimulationControls({
  isRunning,
  onToggle,
  onReset,
  delayCount,
  totalLines,
}: SimulationControlsProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-white mb-1">NYC Subway Delay Simulator</h1>
          <p className="text-blue-100">Real-time delay simulation and monitoring</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-blue-100 mb-1">Total Lines</div>
          <div className="text-white">{totalLines}</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-blue-100 mb-1">Lines with Delays</div>
          <div className="text-white">{delayCount}</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-blue-100 mb-1">On Time</div>
          <div className="text-white">{totalLines - delayCount}</div>
        </div>
      </div>
    </div>
  );
}
