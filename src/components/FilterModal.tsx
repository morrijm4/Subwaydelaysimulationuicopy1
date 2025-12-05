import { FilterOptions } from '../types/subway';
import { BOROUGHS, STATUS_OPTIONS, SUBWAY_LINES } from '../data/subwayData';
import { X } from 'lucide-react';

interface FilterModalProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

export function FilterModal({ filters, onFilterChange, onClose }: FilterModalProps) {
  const toggleLine = (lineId: string) => {
    const newLines = filters.lines.includes(lineId)
      ? filters.lines.filter((l) => l !== lineId)
      : [...filters.lines, lineId];
    onFilterChange({ ...filters, lines: newLines });
  };

  const toggleBorough = (borough: string) => {
    const newBoroughs = filters.boroughs.includes(borough)
      ? filters.boroughs.filter((b) => b !== borough)
      : [...filters.boroughs, borough];
    onFilterChange({ ...filters, boroughs: newBoroughs });
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const clearFilters = () => {
    onFilterChange({
      lines: [],
      boroughs: [],
      statuses: [],
      searchTerm: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Lines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-900">Lines</label>
              {filters.lines.length > 0 && (
                <button
                  onClick={() => onFilterChange({ ...filters, lines: [] })}
                  className="text-blue-600 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBWAY_LINES.map((line) => (
                <button
                  key={line.id}
                  onClick={() => toggleLine(line.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    filters.lines.includes(line.id)
                      ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                      : 'opacity-60'
                  }`}
                  style={{ backgroundColor: line.color }}
                >
                  <span className="text-white">{line.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Boroughs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-900">Boroughs</label>
              {filters.boroughs.length > 0 && (
                <button
                  onClick={() => onFilterChange({ ...filters, boroughs: [] })}
                  className="text-blue-600 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2">
              {BOROUGHS.map((borough) => (
                <button
                  key={borough}
                  onClick={() => toggleBorough(borough)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                    filters.boroughs.includes(borough)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {borough}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-900">Status</label>
              {filters.statuses.length > 0 && (
                <button
                  onClick={() => onFilterChange({ ...filters, statuses: [] })}
                  className="text-blue-600 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 capitalize">
                    {status.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
