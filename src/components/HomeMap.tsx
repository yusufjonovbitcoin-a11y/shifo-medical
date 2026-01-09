import { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, MapPin, Home as HomeIcon, Shield, Key, Building2 } from 'lucide-react';
import { properties } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface HomeMapProps {
  onViewDetails: (propertyId: string) => void;
  onNavigate: (screen: string) => void;
}

const filterChips = [
  { id: 'all', label: 'All', icon: null },
  { id: 'verified', label: 'Housing Verified', icon: Shield },
  { id: 'ready', label: 'Ready to move', icon: Key },
  { id: 'premium', label: 'Premium', icon: Building2 },
];

export function HomeMap({ onViewDetails, onNavigate }: HomeMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProperties = properties.filter(property =>
    property.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24 bg-[#0A0A0A]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        {/* Location */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-1">Location</p>
          <button className="flex items-center gap-2 text-white">
            <span className="text-lg font-semibold">New Jersey 45463</span>
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 outline-none bg-transparent text-white placeholder-gray-600"
            />
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="w-12 h-12 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-[#2A2A2A] hover:border-[#C1FF72] transition-colors"
          >
            <SlidersHorizontal size={20} className="text-white" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filterChips.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedFilter === chip.id
                    ? 'bg-[#C1FF72] text-[#0A0A0A] font-medium'
                    : 'bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A]'
                }`}
              >
                {Icon && <Icon size={16} />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Property List */}
      <div className="px-5 space-y-4">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#2A2A2A]">
              <HomeIcon size={40} className="text-gray-600" />
            </div>
            <p className="text-gray-400">Mos uy topilmadi</p>
          </div>
        ) : (
          filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PropertyCard
                property={property}
                onViewDetails={() => onViewDetails(property.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
