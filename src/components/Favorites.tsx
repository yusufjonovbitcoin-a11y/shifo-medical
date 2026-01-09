import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { properties } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface FavoritesProps {
  onViewDetails: (propertyId: string) => void;
  onNavigate: (screen: string) => void;
}

export function Favorites({ onViewDetails, onNavigate }: FavoritesProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteIds(favorites);
    };

    loadFavorites();
    window.addEventListener('storage', loadFavorites);
    const interval = setInterval(loadFavorites, 500);

    return () => {
      window.removeEventListener('storage', loadFavorites);
      clearInterval(interval);
    };
  }, []);

  const favoriteProperties = properties.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-white mb-2">Saqlangan uylar</h1>
        {favoriteProperties.length > 0 && (
          <p className="text-gray-400">{favoriteProperties.length} ta tanlangan</p>
        )}
      </div>

      {/* Content */}
      <div className="px-5">
        {favoriteProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-28 h-28 bg-[#1A1A1A] rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#2A2A2A]">
              <Heart size={56} className="text-gray-600" />
            </div>
            <h3 className="text-white mb-2">Hozircha saqlangan uylar yo'q</h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Yoqtirgan uylaringizni saqlang
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-4 bg-[#C1FF72] text-[#0A0A0A] rounded-2xl font-bold hover:bg-[#B0EE61] transition-colors"
            >
              Uylarni ko'rish
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProperties.map((property, index) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
