import { Station, SubwayLineData, CityStatus, Prediction } from '../types/digitalTwin';

export const STATIONS: Station[] = [
  {
    id: 'times-sq',
    name: 'Times Sq - 42 St',
    lines: ['1', '2', '3', '7', 'N', 'Q', 'R', 'W', 'S'],
    latitude: 40.7580,
    longitude: -73.9835,
    congestion: 'high',
    delays: [],
    elevatorStatus: 'operational',
    transfers: ['1', '2', '3', '7', 'N', 'Q', 'R', 'W'],
    nextTrains: [
      { line: '1', destination: 'Van Cortlandt Park', arrivalMinutes: 2, accuracy: 'high' },
      { line: 'N', destination: 'Astoria', arrivalMinutes: 4, accuracy: 'medium' },
    ],
  },
  {
    id: 'atlantic-ave',
    name: 'Atlantic Ave - Barclays Ctr',
    lines: ['2', '3', '4', '5', 'B', 'D', 'N', 'Q', 'R'],
    latitude: 40.6844,
    longitude: -73.9682,
    congestion: 'medium',
    delays: [
      {
        type: 'congestion',
        severity: 'minor',
        message: 'Heavy passenger volume',
        estimatedDuration: 10,
      },
    ],
    elevatorStatus: 'operational',
    transfers: ['2', '3', '4', '5', 'B', 'D', 'N', 'Q', 'R'],
    nextTrains: [
      { line: '2', destination: 'Flatbush Ave', arrivalMinutes: 4, accuracy: 'high' },
      { line: 'Q', destination: '96 St', arrivalMinutes: 6, accuracy: 'medium' },
    ],
  },
  {
    id: 'fulton-st',
    name: 'Fulton St',
    lines: ['2', '3', '4', '5', 'A', 'C', 'J', 'Z'],
    latitude: 40.7097,
    longitude: -74.0087,
    congestion: 'low',
    delays: [],
    elevatorStatus: 'operational',
    transfers: ['2', '3', '4', '5', 'A', 'C', 'J', 'Z'],
    nextTrains: [
      { line: 'A', destination: 'Inwood', arrivalMinutes: 2, accuracy: 'high' },
      { line: '4', destination: 'Woodlawn', arrivalMinutes: 5, accuracy: 'high' },
    ],
  },
  {
    id: 'broadway-g',
    name: 'Broadway',
    lines: ['G'],
    latitude: 40.5800,
    longitude: -73.8100,
    congestion: 'medium',
    delays: [],
    elevatorStatus: 'operational',
    transfers: ['G'],
    nextTrains: [
      { line: 'G', destination: 'Court Sq', arrivalMinutes: 3, accuracy: 'high' },
      { line: 'G', destination: 'Church Ave', arrivalMinutes: 5, accuracy: 'medium' },
    ],
  },
];

export const SUBWAY_LINES: SubwayLineData[] = [
  { id: '1', name: '1', color: '#EE352E', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: '2', name: '2', color: '#EE352E', status: 'good-service', congestionTrend: 'rising', activeDelays: 0 },
  { id: '3', name: '3', color: '#EE352E', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: '4', name: '4', color: '#00933C', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: '5', name: '5', color: '#00933C', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: '6', name: '6', color: '#00933C', status: 'good-service', congestionTrend: 'falling', activeDelays: 0 },
  { id: '7', name: '7', color: '#B933AD', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'A', name: 'A', color: '#0039A6', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'C', name: 'C', color: '#0039A6', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'E', name: 'E', color: '#0039A6', status: 'good-service', congestionTrend: 'rising', activeDelays: 0 },
  { id: 'B', name: 'B', color: '#FF6319', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'D', name: 'D', color: '#FF6319', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'F', name: 'F', color: '#FF6319', status: 'delays', congestionTrend: 'rising', activeDelays: 1 },
  { id: 'M', name: 'M', color: '#FF6319', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'G', name: 'G', color: '#6CBE45', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'J', name: 'J', color: '#996633', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'Z', name: 'Z', color: '#996633', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'L', name: 'L', color: '#A7A9AC', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'N', name: 'N', color: '#FCCC0A', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'Q', name: 'Q', color: '#FCCC0A', status: 'good-service', congestionTrend: 'rising', activeDelays: 0 },
  { id: 'R', name: 'R', color: '#FCCC0A', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'W', name: 'W', color: '#FCCC0A', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
  { id: 'S', name: 'S', color: '#808183', status: 'good-service', congestionTrend: 'stable', activeDelays: 0 },
];

export const CITY_STATUS: CityStatus = {
  delayIndex: 'moderate',
  activeDelays: 4,
  elevatorsOut: 3,
  prediction: 'Predicted congestion rising in Midtown in 18 min',
};

export const PREDICTIONS: Prediction[] = [
  {
    stationId: 'herald-sq',
    message: 'Ripple effect expected in 12 minutes',
    timeframe: 12,
    confidence: 87,
    type: 'ripple-effect',
  },
  {
    stationId: 'herald-sq',
    message: 'Congestion rising due to upstream delay on Line D',
    timeframe: 8,
    confidence: 92,
    type: 'congestion',
  },
  {
    stationId: 'times-sq',
    message: 'Peak hour congestion expected',
    timeframe: 25,
    confidence: 78,
    type: 'congestion',
  },
];

export const DELAY_TYPES = [
  'signal-failure',
  'mechanical',
  'police',
  'congestion',
  'construction',
  'planned-outage',
  'accessibility',
];