import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Share2, Save, TrendingUp, Clock } from 'lucide-react';

interface SimulationScenarioScreenProps {
  lineName: string;
  lineColor: string;
  onBack: () => void;
}

const TIME_FRAMES = [
  { value: '6am', label: '6:00 AM', hour: 6, isPeak: false, congestionBase: 30 },
  { value: '7am', label: '7:00 AM', hour: 7, isPeak: true, congestionBase: 70 },
  { value: '8am', label: '8:00 AM', hour: 8, isPeak: true, congestionBase: 85 },
  { value: '9am', label: '9:00 AM', hour: 9, isPeak: true, congestionBase: 75 },
  { value: '10am', label: '10:00 AM', hour: 10, isPeak: false, congestionBase: 45 },
  { value: '12pm', label: '12:00 PM', hour: 12, isPeak: false, congestionBase: 55 },
  { value: '1pm', label: '1:00 PM', hour: 13, isPeak: false, congestionBase: 50 },
  { value: '3pm', label: '3:00 PM', hour: 15, isPeak: false, congestionBase: 50 },
  { value: '5pm', label: '5:00 PM', hour: 17, isPeak: true, congestionBase: 80 },
  { value: '6pm', label: '6:00 PM', hour: 18, isPeak: true, congestionBase: 90 },
  { value: '7pm', label: '7:00 PM', hour: 19, isPeak: true, congestionBase: 70 },
  { value: '8pm', label: '8:00 PM', hour: 20, isPeak: false, congestionBase: 50 },
  { value: '10pm', label: '10:00 PM', hour: 22, isPeak: false, congestionBase: 35 },
];

export function SimulationScenarioScreen({ lineName, lineColor, onBack }: SimulationScenarioScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(TIME_FRAMES[4]); // Default to 10am
  const [disruptionType, setDisruptionType] = useState<'signal-failure' | 'overcrowding' | 'maintenance'>('signal-failure');
  const [selectedLines, setSelectedLines] = useState<string[]>([lineName]);

  const simulationDuration = 60; // Always simulate 60 minutes forward

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= simulationDuration) {
          setIsPlaying(false);
          return simulationDuration;
        }
        return prev + 1;
      });
    }, 100); // Fast simulation

    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = (currentTime / simulationDuration) * 100;

  // Calculate current simulation time
  const getCurrentSimTime = () => {
    const totalMinutes = selectedTimeFrame.hour * 60 + currentTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get congestion intensity based on time frame and progress
  const getCongestionMultiplier = () => {
    const baseMultiplier = selectedTimeFrame.congestionBase / 100;
    const disruptionMultiplier = currentTime > 0 ? 1 + (currentTime / simulationDuration) * 0.5 : 1;
    return Math.min(baseMultiplier * disruptionMultiplier, 1);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900">Simulation Scenario</h1>
            <p className="text-sm text-gray-500">Midtown Signal Failure</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Control Panel */}
        <div className="bg-white p-4 mb-2">
          <h2 className="text-gray-900 mb-3">Controls</h2>
          
          <div className="space-y-3">
            {/* Time Frame Selection */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Start Time
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-1">
                {TIME_FRAMES.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setSelectedTimeFrame(tf)}
                    disabled={isPlaying}
                    className={`px-3 py-2 rounded-lg text-xs transition-all ${
                      selectedTimeFrame.value === tf.value
                        ? 'bg-[#2979FF] text-white'
                        : tf.isPeak
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : 'bg-gray-100 text-gray-700'
                    } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {tf.label}
                    {tf.isPeak && selectedTimeFrame.value !== tf.value && (
                      <div className="text-xs text-orange-500 mt-0.5">Peak</div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Simulates 60 minutes from selected time
              </div>
            </div>

            {/* Disruption Type */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Disruption Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'signal-failure', label: 'Signal Failure' },
                  { value: 'overcrowding', label: 'Overcrowding' },
                  { value: 'maintenance', label: 'Maintenance' },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setDisruptionType(type.value as any)}
                    disabled={isPlaying}
                    className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                      disruptionType === type.value
                        ? 'bg-[#2979FF] text-white'
                        : 'bg-gray-100 text-gray-700'
                    } ${isPlaying ? 'opacity-50' : ''}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lines Affected */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Lines Affected</label>
              <div className="flex gap-2 flex-wrap">
                {['F', 'M', 'D', 'B', 'N', 'Q', 'R', 'W'].map((line) => (
                  <button
                    key={line}
                    onClick={() => {
                      if (selectedLines.includes(line)) {
                        setSelectedLines(selectedLines.filter((l) => l !== line));
                      } else {
                        setSelectedLines([...selectedLines, line]);
                      }
                    }}
                    disabled={isPlaying}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedLines.includes(line)
                        ? 'ring-2 ring-offset-2 ring-[#2979FF]'
                        : 'opacity-40'
                    } ${isPlaying ? 'cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: lineColor }}
                  >
                    <span className="text-white text-sm">{line}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Play Controls */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#2979FF] text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? (
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
                onClick={resetSimulation}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Live Simulation</h2>
            <div className="text-sm text-gray-600">
              {getCurrentSimTime()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-[#2979FF] h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 text-center mb-4">
            {currentTime} / {simulationDuration} minutes elapsed
          </div>

          {/* Heatmap Visualization */}
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 390 256">
              {/* Grid */}
              <defs>
                <pattern id="sim-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="390" height="256" fill="url(#sim-grid)" />

              {/* Subway Lines */}
              <line x1="100" y1="30" x2="100" y2="230" stroke="#EE352E" strokeWidth="6" opacity="0.6" />
              <line x1="180" y1="30" x2="180" y2="230" stroke="#FF6319" strokeWidth="6" opacity="0.6" />
              <line x1="195" y1="30" x2="195" y2="230" stroke="#FF6319" strokeWidth="6" opacity="0.6" />
              <line x1="230" y1="30" x2="230" y2="230" stroke="#00933C" strokeWidth="6" opacity="0.6" />
              <line x1="50" y1="180" x2="350" y2="180" stroke="#FCCC0A" strokeWidth="6" opacity="0.6" />

              {/* Animated congestion heatmap */}
              {isPlaying || currentTime > 0 ? (
                <>
                  {/* Primary bottleneck */}
                  <circle
                    cx="195"
                    cy="128"
                    r={50 + (currentTime / simulationDuration) * 30}
                    fill="#E28A26"
                    opacity={0.4 * (currentTime / simulationDuration)}
                  />
                  <circle
                    cx="195"
                    cy="128"
                    r={30 + (currentTime / simulationDuration) * 20}
                    fill="#D64545"
                    opacity={0.6 * (currentTime / simulationDuration)}
                  />

                  {/* Ripple effects */}
                  {currentTime > simulationDuration * 0.3 && (
                    <>
                      <circle
                        cx="230"
                        cy="180"
                        r={40 * ((currentTime - simulationDuration * 0.3) / (simulationDuration * 0.7))}
                        fill="#F7D154"
                        opacity={0.3 * ((currentTime - simulationDuration * 0.3) / (simulationDuration * 0.7))}
                      />
                      <circle
                        cx="100"
                        cy="150"
                        r={35 * ((currentTime - simulationDuration * 0.3) / (simulationDuration * 0.7))}
                        fill="#F7D154"
                        opacity={0.25 * ((currentTime - simulationDuration * 0.3) / (simulationDuration * 0.7))}
                      />
                    </>
                  )}

                  {/* Passenger flow arrows */}
                  {currentTime > simulationDuration * 0.5 && (
                    <>
                      <path
                        d="M 195 128 L 230 180"
                        stroke="#E28A26"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        opacity="0.6"
                        markerEnd="url(#arrowhead)"
                      />
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3, 0 6" fill="#E28A26" />
                        </marker>
                      </defs>
                    </>
                  )}
                </>
              ) : (
                <text x="195" y="128" textAnchor="middle" fill="#9ca3af" fontSize="14">
                  Press Start to begin simulation
                </text>
              )}

              {/* Station markers */}
              <circle cx="195" cy="128" r="6" fill="white" stroke="#333" strokeWidth="2" />
              <circle cx="230" cy="180" r="6" fill="white" stroke="#333" strokeWidth="2" />
              <circle cx="100" cy="150" r="6" fill="white" stroke="#333" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900">Simulation Insights</h2>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-sm text-red-900 mb-1">Primary bottleneck: 34 St–Herald Sq</div>
              <div className="text-xs text-red-700">
                Congestion intensity: {Math.round((currentTime / simulationDuration) * 100)}%
              </div>
            </div>

            {currentTime > simulationDuration * 0.3 && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="text-sm text-yellow-900 mb-1">
                  Secondary ripple: delays on N/Q/R in 14–20 min
                </div>
                <div className="text-xs text-yellow-700">Propagation detected</div>
              </div>
            )}

            {currentTime > simulationDuration * 0.6 && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-900 mb-1">
                  Suggested mitigation: reroute F trains via express track
                </div>
                <div className="text-xs text-blue-700">Estimated delay reduction: 8 min</div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-4">
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Save className="w-5 h-5" />
              Save Scenario
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
              Share with Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}