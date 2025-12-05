export type CongestionLevel = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';
export type LineStatus = 'good-service' | 'delays' | 'service-change' | 'suspended';

export type Station = {
  id: string;
  name: string;
  lines: string[];
  latitude: number;
  longitude: number;
  congestion: CongestionLevel;
  delays: StationDelay[];
  elevatorStatus: 'operational' | 'outage';
  transfers: string[];
  nextTrains: TrainArrival[];
};

export type StationDelay = {
  type: 'signal-failure' | 'mechanical' | 'police' | 'congestion' | 'construction' | 'planned-outage' | 'accessibility';
  severity: 'minor' | 'moderate' | 'major';
  message: string;
  estimatedDuration: number; // minutes
};

export type TrainArrival = {
  line: string;
  destination: string;
  arrivalMinutes: number;
  accuracy: 'high' | 'medium' | 'low';
};

export type SubwayLineData = {
  id: string;
  name: string;
  color: string;
  status: LineStatus;
  congestionTrend: 'rising' | 'stable' | 'falling';
  activeDelays: number;
};

export type CityStatus = {
  delayIndex: 'low' | 'moderate' | 'high' | 'severe';
  activeDelays: number;
  elevatorsOut: number;
  prediction: string;
};

export type FilterOptions = {
  dateRange: 'today' | 'past-24h' | 'this-week' | 'custom';
  peakHoursOnly: boolean;
  selectedLines: string[];
  showExpress: boolean;
  showLocal: boolean;
  delayTypes: string[];
  showPredictions: boolean;
  showHighRiskOnly: boolean;
};

export type Prediction = {
  stationId: string;
  message: string;
  timeframe: number; // minutes from now
  confidence: number; // 0-100
  type: 'congestion' | 'delay' | 'ripple-effect';
};
