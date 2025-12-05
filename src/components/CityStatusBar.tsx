import { CityStatus } from '../types/digitalTwin';
import { TrendingUp, AlertCircle, Wrench, Lightbulb } from 'lucide-react';

interface CityStatusBarProps {
  status: CityStatus;
}

export function CityStatusBar({ status }: CityStatusBarProps) {
  const getDelayIndexColor = () => {
    switch (status.delayIndex) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'severe':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">City Delay Index</span>
          <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getDelayIndexColor()}`}>
            {status.delayIndex}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Delays</div>
            <div className="text-sm text-gray-900">{status.activeDelays}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Elevators</div>
            <div className="text-sm text-gray-900">{status.elevatorsOut} out</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Trend</div>
            <div className="text-sm text-gray-900">Rising</div>
          </div>
        </div>
      </div>

      {/* Prediction */}
      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
        <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900">{status.prediction}</p>
      </div>
    </div>
  );
}