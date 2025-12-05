import { FilterOptions } from '../types/digitalTwin';
import { X, Calendar, Route, AlertTriangle, TrendingUp } from 'lucide-react';
import { SUBWAY_LINES, DELAY_TYPES } from '../data/digitalTwinData';

interface AdvancedFilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

export function AdvancedFilterPanel({ filters, onFilterChange, onClose }: AdvancedFilterPanelProps) {
  const toggleLine = (lineId: string) => {
    const newLines = filters.selectedLines.includes(lineId)
      ? filters.selectedLines.filter((l) => l !== lineId)
      : [...filters.selectedLines, lineId];
    onFilterChange({ ...filters, selectedLines: newLines });
  };

  const toggleDelayType = (type: string) => {
    const newTypes = filters.delayTypes.includes(type)
      ? filters.delayTypes.filter((t) => t !== type)
      : [...filters.delayTypes, type];
    onFilterChange({ ...filters, delayTypes: newTypes });
  };

  const clearFilters = () => {
    onFilterChange({
      dateRange: 'today',
      peakHoursOnly: false,
      selectedLines: [],
      showExpress: true,
      showLocal: true,
      delayTypes: [],
      showPredictions: true,
      showHighRiskOnly: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-gray-900">Advanced Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Date & Time */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-600" />
              <label className="text-gray-900">Date & Time</label>
            </div>
            <div className="space-y-2">
              {['today', 'past-24h', 'this-week', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => onFilterChange({ ...filters, dateRange: range as any })}
                  className={`w-full px-4 py-2.5 rounded-xl text-left transition-all ${
                    filters.dateRange === range
                      ? 'bg-[#2979FF] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {range === 'today' && 'Today'}
                  {range === 'past-24h' && 'Past 24 Hours'}
                  {range === 'this-week' && 'This Week'}
                  {range === 'custom' && 'Select Date Range'}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.peakHoursOnly}
                onChange={(e) =>
                  onFilterChange({ ...filters, peakHoursOnly: e.target.checked })
                }
                className="w-4 h-4 text-[#2979FF] rounded"
              />
              <span className="text-sm text-gray-700">Peak Hours Only</span>
            </label>
          </div>

          {/* Routes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Route className="w-4 h-4 text-gray-600" />
              <label className="text-gray-900">Routes</label>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {SUBWAY_LINES.map((line) => (
                <button
                  key={line.id}
                  onClick={() => toggleLine(line.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    filters.selectedLines.includes(line.id)
                      ? 'ring-2 ring-offset-2 ring-[#2979FF] scale-110'
                      : 'opacity-60'
                  }`}
                  style={{ backgroundColor: line.color }}
                >
                  <span className="text-white text-sm">{line.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showExpress}
                  onChange={(e) =>
                    onFilterChange({ ...filters, showExpress: e.target.checked })
                  }
                  className="w-4 h-4 text-[#2979FF] rounded"
                />
                <span className="text-sm text-gray-700">Show Express</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showLocal}
                  onChange={(e) =>
                    onFilterChange({ ...filters, showLocal: e.target.checked })
                  }
                  className="w-4 h-4 text-[#2979FF] rounded"
                />
                <span className="text-sm text-gray-700">Show Local</span>
              </label>
            </div>
          </div>

          {/* Delays */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-gray-600" />
              <label className="text-gray-900">Delays</label>
            </div>
            <div className="space-y-2">
              {DELAY_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.delayTypes.includes(type)}
                    onChange={() => toggleDelayType(type)}
                    className="w-4 h-4 text-[#2979FF] rounded"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {type.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Congestion & Prediction */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <label className="text-gray-900">Congestion & Prediction</label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showPredictions}
                  onChange={(e) =>
                    onFilterChange({ ...filters, showPredictions: e.target.checked })
                  }
                  className="w-4 h-4 text-[#2979FF] rounded"
                />
                <span className="text-sm text-gray-700">Show predicted congestion (next 30 min)</span>
              </label>
              <label className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showHighRiskOnly}
                  onChange={(e) =>
                    onFilterChange({ ...filters, showHighRiskOnly: e.target.checked })
                  }
                  className="w-4 h-4 text-[#2979FF] rounded"
                />
                <span className="text-sm text-gray-700">Only show high-risk routes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#2979FF] text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
