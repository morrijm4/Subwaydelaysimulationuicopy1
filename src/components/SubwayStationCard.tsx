import { SubwayLine } from '../types/subway';
import { Clock, AlertTriangle } from 'lucide-react';

interface SubwayStationCardProps {
  line: SubwayLine;
}

export function SubwayStationCard({ line }: SubwayStationCardProps) {
  const getStatusColor = () => {
    switch (line.status) {
      case 'on-time':
        return 'text-green-600';
      case 'delays':
        return 'text-yellow-600';
      case 'service-change':
        return 'text-orange-600';
      case 'suspended':
        return 'text-red-600';
    }
  };

  const getStatusText = () => {
    switch (line.status) {
      case 'on-time':
        return 'On Time';
      case 'delays':
        return 'Delays';
      case 'service-change':
        return 'Service Change';
      case 'suspended':
        return 'Suspended';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        {/* Line Badge */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: line.color }}
        >
          <span className="text-white">{line.name}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-gray-900 mb-1">
                {line.borough.join(' and ').toUpperCase()}
              </div>
              {line.status === 'on-time' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{getStatusText()}</span>
                </div>
              ) : (
                <div className={`flex items-center gap-1 ${getStatusColor()}`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{getStatusText()}</span>
                </div>
              )}
            </div>
            {line.delayMinutes && (
              <div className="text-right">
                <div className="text-red-600">{line.delayMinutes} min</div>
                <div className="text-xs text-gray-500">delay</div>
              </div>
            )}
          </div>

          {line.status !== 'on-time' && line.delayReason && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: line.color, opacity: 0.2 }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: line.color }}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 mb-1">{line.delayReason}</div>
                  <div className="text-xs text-gray-500">
                    Updated {line.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {line.status === 'on-time' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Running on schedule
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Next train: 2 min, 5 min, 9 min
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
