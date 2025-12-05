export type SubwayLine = {
  id: string;
  name: string;
  color: string;
  borough: string[];
  status: 'on-time' | 'delays' | 'service-change' | 'suspended';
  delayMinutes?: number;
  delayReason?: string;
  lastUpdated: Date;
};

export type DelayReason = 
  | 'Signal Problems'
  | 'Track Maintenance'
  | 'Train Traffic'
  | 'Medical Emergency'
  | 'Police Investigation'
  | 'Weather Conditions'
  | 'Mechanical Problems'
  | 'Overcrowding';

export type FilterOptions = {
  lines: string[];
  boroughs: string[];
  statuses: string[];
  searchTerm: string;
};
