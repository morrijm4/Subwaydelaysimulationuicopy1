import { useState } from 'react';
import { SubwayLineData, Station } from '../types/digitalTwin';
import { ArrowLeft, Bell, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

interface RouteDetailScreenProps {
  line: SubwayLineData;
  stations: Station[];
  onBack: () => void;
  onSimulate: () => void;
}

export function RouteDetailScreen({ line, stations, onBack, onSimulate }: RouteDetailScreenProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30min' | '60min' | '120min'>('60min');
  
  // Filter stations that include this line
  const lineStations = stations.filter((s) => s.lines.includes(line.id));

  const getStatusColor = () => {
    switch (line.status) {
      case 'good-service':
        return 'bg-green-100 text-green-700';
      case 'delays':
        return 'bg-yellow-100 text-yellow-700';
      case 'service-change':
        return 'bg-orange-100 text-orange-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
    }
  };

  const getStatusText = () => {
    switch (line.status) {
      case 'good-service':
        return 'Good Service';
      case 'delays':
        return 'Major Delays';
      case 'service-change':
        return 'Service Change';
      case 'suspended':
        return 'Suspended';
    }
  };

  const getTrendIcon = () => {
    switch (line.congestionTrend) {
      case 'rising':
        return '↗';
      case 'falling':
        return '↘';
      case 'stable':
        return '→';
    }
  };

  // Mock congestion data for chart
  const generateCongestionData = () => {
    const points: { time: string; value: number }[] = [];
    const now = new Date();
    const interval = selectedTimeframe === '30min' ? 5 : selectedTimeframe === '60min' ? 10 : 20;
    const count = selectedTimeframe === '30min' ? 6 : selectedTimeframe === '60min' ? 6 : 6;
    
    for (let i = 0; i < count; i++) {
      const time = new Date(now.getTime() + i * interval * 60000);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const value = 30 + Math.random() * 40 + (hours >= 16 && hours <= 18 ? 20 : 0);
      points.push({
        time: `${hours}:${minutes.toString().padStart(2, '0')}`,
        value: Math.round(value),
      });
    }
    return points;
  };

  const congestionData = generateCongestionData();
  const maxValue = Math.max(...congestionData.map((d) => d.value));

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: line.color }}
          >
            <span className="text-white">{line.name}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-gray-900">Line {line.name}</h1>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Line Overview */}
        <div className="bg-white p-4 mb-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{lineStations.length}</div>
              <div className="text-xs text-gray-600">Stations</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{line.activeDelays}</div>
              <div className="text-xs text-gray-600">Active Delays</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{getTrendIcon()}</div>
              <div className="text-xs text-gray-600 capitalize">{line.congestionTrend}</div>
            </div>
          </div>
        </div>

        {/* Line Diagram */}
        <div className="bg-white p-4 mb-1">
          <h2 className="text-gray-900 mb-2">Station Overview</h2>
          <div className="overflow-x-auto pb-2 pt-1">
            <div className="flex gap-2 min-w-max">
              {lineStations.map((station, idx) => (
                <div key={station.id} className="relative">
                  <div className="flex flex-col items-center w-20">
                    {/* Station Circle */}
                    <div className="relative mb-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                        style={{ backgroundColor: line.color }}
                      >
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                      </div>
                      
                      {/* Congestion Badge */}
                      {station.congestion === 'high' && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      {/* Delay Badge */}
                      {station.delays.length > 0 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Station Name */}
                    <div className="text-xs text-center text-gray-900 line-clamp-2 h-4">
                      {station.name.split('-')[0].trim()}
                    </div>
                    
                    {/* Transfer Icons */}
                    {/* Removed transfer count display */}
                  </div>
                  
                  {/* Connecting Line */}
                  {idx < lineStations.length - 1 && (
                    <div
                      className="absolute top-6 left-full w-2 h-1"
                      style={{ backgroundColor: line.color }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Overview */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-gray-900">Projected Congestion</h2>
            <div className="flex gap-1">
              {(['30min', '60min', '120min'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-[#2979FF] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-40 mb-3">
            <svg className="w-full h-full" viewBox="0 0 350 160">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="30"
                  y1={160 - (y * 1.4)}
                  x2="350"
                  y2={160 - (y * 1.4)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y-axis labels */}
              {[0, 25, 50, 75, 100].map((y) => (
                <text
                  key={y}
                  x="5"
                  y={165 - (y * 1.4)}
                  fontSize="10"
                  fill="#9ca3af"
                >
                  {y}%
                </text>
              ))}

              {/* Line chart */}
              <polyline
                points={congestionData
                  .map((d, i) => {
                    const x = 40 + (i * (310 / (congestionData.length - 1)));
                    const y = 160 - (d.value * 1.4);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
              />
              
              {/* Data points */}
              {congestionData.map((d, i) => {
                const x = 40 + (i * (310 / (congestionData.length - 1)));
                const y = 160 - (d.value * 1.4);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="white" stroke={line.color} strokeWidth="2" />
                  </g>
                );
              })}
              
              {/* X-axis labels */}
              {congestionData.map((d, i) => {
                const x = 40 + (i * (310 / (congestionData.length - 1)));
                return (
                  <text
                    key={i}
                    x={x}
                    y="175"
                    fontSize="10"
                    fill="#9ca3af"
                    textAnchor="middle"
                  >
                    {d.time}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Insights */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm text-blue-900">
                Crowding expected to peak at 5:32 PM
              </div>
            </div>
            {line.status === 'delays' && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm text-yellow-900">
                  Upstream signal failure may delay downtown service by 14 min
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-4">
          <div className="space-y-2">
            <button
              onClick={onSimulate}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#2979FF] text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span>Simulate Scenario</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" />
              Follow Line for Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}