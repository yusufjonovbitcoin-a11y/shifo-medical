import { Heart, MapPin, Bed, Maximize2, Car } from 'lucide-react';
import { Property } from '../data/properties';
import { useState, useEffect } from 'react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: () => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== property.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(property.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div
      onClick={onViewDetails}
      className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-[#2A2A2A] hover:border-[#C1FF72]/30 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] animate-pulse"></div>
        )}
        
        <img
          src={property.images[0]}
          alt={property.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="bg-[#C1FF72] text-[#0A0A0A] px-4 py-1.5 rounded-full text-sm font-bold">
            For Sale
          </div>
          
          <button
            onClick={toggleFavorite}
            className="w-10 h-10 bg-[#0A0A0A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[#2A2A2A] hover:scale-110 transition-transform"
          >
            <Heart
              size={20}
              className={`transition-all ${
                isFavorite 
                  ? 'fill-[#C1FF72] text-[#C1FF72]' 
                  : 'text-white'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-gray-400 text-sm">{property.district}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold mb-3 line-clamp-1">
          {property.title}
        </h3>

        {/* Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Bed size={16} />
            <span>{property.rooms} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 size={16} />
            <span>{property.area} Sqy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car size={16} />
            <span>2 Bth</span>
          </div>
        </div>

        {/* Price and Contact */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#C1FF72] text-2xl font-bold">
              ${(property.price / 1000).toFixed(0)}k
            </span>
          </div>
          <button className="bg-[#0A0A0A] text-white px-6 py-2 rounded-full text-sm font-medium border border-[#2A2A2A] hover:border-[#C1FF72] hover:text-[#C1FF72] transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
