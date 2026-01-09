import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { properties } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface SearchFilterProps {
  onViewDetails: (propertyId: string) => void;
  onNavigate: (screen: string) => void;
}

export function SearchFilter({ onViewDetails, onNavigate }: SearchFilterProps) {
  const [recentSearches, setRecentSearches] = useState([
    'Anand Niketan',
    'Flat for sell',
    'Panchsheel Park',
    'Chanakyapuri'
  ]);

  const removeSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#2A2A2A]"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none bg-transparent text-white placeholder-gray-600"
            />
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Resent Search</h3>
            <button 
              onClick={() => setRecentSearches([])}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1A1A1A] rounded-2xl px-5 py-4 border border-[#2A2A2A]"
              >
                <span className="text-white">{search}</span>
                <button
                  onClick={() => removeSearch(search)}
                  className="w-6 h-6 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-[#3A3A3A] transition-colors"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-20 left-0 right-0 px-5">
        <button className="w-full bg-[#C1FF72] text-[#0A0A0A] py-4 rounded-2xl font-bold text-lg hover:bg-[#B0EE61] transition-colors shadow-2xl">
          Save
        </button>
      </div>
    </div>
  );
}
