import { Station, Prediction } from '../types/digitalTwin';
import { ArrowLeft, Clock, AlertTriangle, Bell, Bookmark, TrendingUp, Accessibility } from 'lucide-react';

interface StationDetailScreenProps {
  station: Station;
  predictions: Prediction[];
  onBack: () => void;
}

export function StationDetailScreen({ station, predictions, onBack }: StationDetailScreenProps) {
  const getCongestionColor = () => {
    switch (station.congestion) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
    }
  };

  const stationPredictions = predictions.filter((p) => p.stationId === station.id);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900">{station.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {station.lines.map((line) => {
                const lineData = require('../data/digitalTwinData').SUBWAY_LINES.find(
                  (l: any) => l.id === line
                );
                return (
                  <div
                    key={line}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: lineData?.color || '#999' }}
                  >
                    <span className="text-white text-xs">{line}</span>
                  </div>
                );
              })}
              <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getCongestionColor()}`}>
                {station.congestion}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Live Status */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Live Status</h2>
          </div>

          {/* Next Trains */}
          <div className="space-y-3 mb-4">
            {station.nextTrains.map((train, idx) => {
              const lineData = require('../data/digitalTwinData').SUBWAY_LINES.find(
                (l: any) => l.id === train.line
              );
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: lineData?.color || '#999' }}
                    >
                      <span className="text-white text-sm">{train.line}</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{train.destination}</div>
                      <div className="text-xs text-gray-500">
                        Accuracy: {train.accuracy}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900">{train.arrivalMinutes} min</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Delays */}
          {station.delays.length > 0 && (
            <div className="space-y-2">
              {station.delays.map((delay, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-100"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-red-900 mb-1">{delay.message}</div>
                    <div className="text-xs text-red-700">
                      Est. duration: {delay.estimatedDuration} min · {delay.severity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Accessibility */}
          <div className="flex items-center gap-2 mt-3 p-3 bg-gray-50 rounded-lg">
            <Accessibility className={`w-5 h-5 ${station.elevatorStatus === 'operational' ? 'text-green-600' : 'text-orange-600'}`} />
            <div className="flex-1">
              <div className="text-sm text-gray-900">Elevator</div>
              <div className={`text-xs ${station.elevatorStatus === 'operational' ? 'text-green-700' : 'text-orange-700'}`}>
                {station.elevatorStatus === 'operational' ? 'Operational' : 'Outage Reported'}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Twin Predictions */}
        {stationPredictions.length > 0 && (
          <div className="bg-white p-4 mb-2">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-gray-900">Digital Twin Prediction</h2>
            </div>

            <div className="space-y-3">
              {stationPredictions.map((prediction, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="flex-1">
                      <div className="text-sm text-blue-900">{prediction.message}</div>
                      <div className="text-xs text-blue-700 mt-1">
                        In {prediction.timeframe} minutes · {prediction.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
              View Full Heatmap Simulation
            </button>
          </div>
        )}

        {/* Alert & Save */}
        <div className="bg-white p-4">
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2979FF] text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5" />
              Notify me if congestion exceeds threshold
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Bookmark className="w-5 h-5" />
              Save this station
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
