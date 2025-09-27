import React from 'react';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  selectedCategory: string;
  selectedDistance: string;
  selectedDate: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDistanceChange: (distance: string) => void;
  onDateChange: (date: string) => void;
  onToggleMap: () => void;
  showMap: boolean;
}

const categories = [
  'All',
  'Music',
  'Food',
  'Sports',
  'Networking',
  'Art',
  'Tech',
  'Outdoors'
];

const distances = [
  '5 miles',
  '10 miles',
  '25 miles',
  '50 miles'
];

const dateFilters = [
  'Any time',
  'Today',
  'Tomorrow',
  'This week',
  'This month'
];

export default function FilterBar({
  searchQuery,
  selectedCategory,
  selectedDistance,
  selectedDate,
  onSearchChange,
  onCategoryChange,
  onDistanceChange,
  onDateChange,
  onToggleMap,
  showMap
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Distance Filter */}
        <select
          value={selectedDistance}
          onChange={(e) => onDistanceChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {distances.map(distance => (
            <option key={distance} value={distance}>{distance}</option>
          ))}
        </select>

        {/* Date Filter */}
        <select
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {dateFilters.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        {/* Map Toggle */}
        <button
          onClick={onToggleMap}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            showMap
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MapPin className="w-5 h-5" />
          {showMap ? 'List View' : 'Map View'}
        </button>
      </div>
    </div>
  );
}