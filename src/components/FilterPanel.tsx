import { FilterOptions } from '../types/subway';
import { BOROUGHS, STATUS_OPTIONS, SUBWAY_LINES } from '../data/subwayData';
import { Search, X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
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

  const hasActiveFilters =
    filters.lines.length > 0 ||
    filters.boroughs.length > 0 ||
    filters.statuses.length > 0 ||
    filters.searchTerm !== '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-gray-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by reason..."
            value={filters.searchTerm}
            onChange={(e) =>
              onFilterChange({ ...filters, searchTerm: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lines */}
      <div>
        <label className="block text-gray-700 mb-2">Lines</label>
        <div className="flex flex-wrap gap-2">
          {SUBWAY_LINES.map((line) => (
            <button
              key={line.id}
              onClick={() => toggleLine(line.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                filters.lines.includes(line.id)
                  ? 'ring-2 ring-offset-2 ring-blue-500'
                  : 'opacity-60 hover:opacity-100'
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
        <label className="block text-gray-700 mb-2">Boroughs</label>
        <div className="flex flex-wrap gap-2">
          {BOROUGHS.map((borough) => (
            <button
              key={borough}
              onClick={() => toggleBorough(borough)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filters.boroughs.includes(borough)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
              }`}
            >
              {borough}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-700 mb-2">Status</label>
        <div className="space-y-2">
          {STATUS_OPTIONS.map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.statuses.includes(status)}
                onChange={() => toggleStatus(status)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 capitalize">{status.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
