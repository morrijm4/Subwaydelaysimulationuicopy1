import { SubwayLine, DelayReason } from '../types/subway';

export const SUBWAY_LINES: SubwayLine[] = [
  { id: '1', name: '1', color: '#EE352E', borough: ['Manhattan', 'Bronx'], status: 'on-time', lastUpdated: new Date() },
  { id: '2', name: '2', color: '#EE352E', borough: ['Manhattan', 'Bronx', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: '3', name: '3', color: '#EE352E', borough: ['Manhattan', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: '4', name: '4', color: '#00933C', borough: ['Manhattan', 'Bronx', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: '5', name: '5', color: '#00933C', borough: ['Manhattan', 'Bronx', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: '6', name: '6', color: '#00933C', borough: ['Manhattan', 'Bronx'], status: 'on-time', lastUpdated: new Date() },
  { id: '7', name: '7', color: '#B933AD', borough: ['Manhattan', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'A', name: 'A', color: '#0039A6', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'C', name: 'C', color: '#0039A6', borough: ['Manhattan', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: 'E', name: 'E', color: '#0039A6', borough: ['Manhattan', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'B', name: 'B', color: '#FF6319', borough: ['Manhattan', 'Brooklyn', 'Bronx'], status: 'on-time', lastUpdated: new Date() },
  { id: 'D', name: 'D', color: '#FF6319', borough: ['Manhattan', 'Brooklyn', 'Bronx'], status: 'on-time', lastUpdated: new Date() },
  { id: 'F', name: 'F', color: '#FF6319', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'M', name: 'M', color: '#FF6319', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'G', name: 'G', color: '#6CBE45', borough: ['Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'J', name: 'J', color: '#996633', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'Z', name: 'Z', color: '#996633', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'L', name: 'L', color: '#A7A9AC', borough: ['Manhattan', 'Brooklyn'], status: 'on-time', lastUpdated: new Date() },
  { id: 'N', name: 'N', color: '#FCCC0A', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'Q', name: 'Q', color: '#FCCC0A', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'R', name: 'R', color: '#FCCC0A', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'W', name: 'W', color: '#FCCC0A', borough: ['Manhattan', 'Brooklyn', 'Queens'], status: 'on-time', lastUpdated: new Date() },
  { id: 'S', name: 'S', color: '#808183', borough: ['Manhattan'], status: 'on-time', lastUpdated: new Date() },
];

export const DELAY_REASONS: DelayReason[] = [
  'Signal Problems',
  'Track Maintenance',
  'Train Traffic',
  'Medical Emergency',
  'Police Investigation',
  'Weather Conditions',
  'Mechanical Problems',
  'Overcrowding',
];

export const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx'];

export const STATUS_OPTIONS = ['on-time', 'delays', 'service-change', 'suspended'];
