import { SubwayLine } from '../types/subway';
import { Clock, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface SubwayLineCardProps {
  line: SubwayLine;
}

export function SubwayLineCard({ line }: SubwayLineCardProps) {
  const getStatusIcon = () => {
    switch (line.status) {
      case 'on-time':
        return <Clock className="w-5 h-5 text-green-600" />;
      case 'delays':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'service-change':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'suspended':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (line.status) {
      case 'on-time':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">On Time</span>;
      case 'delays':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Delays</span>;
      case 'service-change':
        return <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800">Service Change</span>;
      case 'suspended':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">Suspended</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: line.color }}
          >
            <span className="text-white">{line.name}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-600">Boroughs:</span>
          {line.borough.map((b) => (
            <span key={b} className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
              {b}
            </span>
          ))}
        </div>

        {line.status !== 'on-time' && (
          <>
            {line.delayMinutes && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Delay:</span>
                <span className="text-red-600">{line.delayMinutes} minutes</span>
              </div>
            )}
            {line.delayReason && (
              <div className="flex items-start gap-2">
                <span className="text-gray-600">Reason:</span>
                <span className="text-gray-800">{line.delayReason}</span>
              </div>
            )}
          </>
        )}

        <div className="text-gray-500 pt-2 border-t">
          Last updated: {line.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
