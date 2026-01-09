import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, MapPin, Maximize2, Bed, Car, Camera, Shield, Check } from 'lucide-react';
import { properties } from '../data/properties';

interface PropertyDetailsProps {
  propertyId: string | null;
  onNavigate: (screen: string) => void;
}

export function PropertyDetails({ propertyId, onNavigate }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = properties.find(p => p.id === propertyId);

  useEffect(() => {
    if (property) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(property.id));
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <p className="text-gray-400">Uy topilmadi</p>
      </div>
    );
  }

  const toggleFavorite = () => {
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
    <div className="min-h-screen bg-[#0A0A0A] pb-28">
      {/* Image Gallery */}
      <div className="relative h-96 bg-[#1A1A1A]">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Top Actions */}
        <div className="absolute top-6 left-5 right-5 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="w-12 h-12 bg-[#0A0A0A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[#2A2A2A] hover:scale-110 transition-transform"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>

          <div className="flex gap-3">
            <button className="w-12 h-12 bg-[#0A0A0A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[#2A2A2A] hover:scale-110 transition-transform">
              <Share2 size={22} className="text-white" />
            </button>
            <button
              onClick={toggleFavorite}
              className="w-12 h-12 bg-[#0A0A0A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[#2A2A2A] hover:scale-110 transition-transform"
            >
              <Heart
                size={22}
                className={isFavorite ? 'fill-[#C1FF72] text-[#C1FF72]' : 'text-white'}
              />
            </button>
          </div>
        </div>

        {/* Center View Button */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A]/80 backdrop-blur-md rounded-full px-5 py-3 flex items-center gap-2 border border-[#2A2A2A] text-white">
          <Camera size={20} />
          <span>Street View</span>
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'w-8 bg-[#C1FF72]'
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        {/* Location and Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-gray-400">{property.district}</span>
          </div>
          <h2 className="text-white mb-3">{property.title}</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-[#C1FF72] text-3xl font-bold">
              ${property.price.toLocaleString()}
            </span>
            <span className="text-gray-400">/month</span>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="flex items-center gap-2 mb-6 bg-[#1A1A1A] rounded-2xl px-4 py-3 border border-[#2A2A2A]">
          <Shield size={18} className="text-[#C1FF72]" />
          <span className="text-sm text-gray-400">Verified On:</span>
          <span className="text-sm text-white font-medium">12/12/24</span>
          <Check size={18} className="text-[#C1FF72] ml-auto" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#1A1A1A] rounded-2xl p-4 text-center border border-[#2A2A2A]">
            <Bed size={24} className="text-[#C1FF72] mx-auto mb-2" />
            <p className="text-white font-semibold">2nd floor</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-4 text-center border border-[#2A2A2A]">
            <Car size={24} className="text-[#C1FF72] mx-auto mb-2" />
            <p className="text-white font-semibold">4 Bth</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-4 text-center border border-[#2A2A2A]">
            <Maximize2 size={24} className="text-[#C1FF72] mx-auto mb-2" />
            <p className="text-white font-semibold">600 Sqy</p>
          </div>
        </div>

        {/* Floor Plan */}
        <div className="mb-6">
          <h3 className="text-white mb-3">Floor Plan</h3>
          <div className="grid grid-cols-2 gap-3">
            {property.images.slice(0, 3).map((img, idx) => (
              <div key={idx} className="relative h-32 rounded-2xl overflow-hidden border border-[#2A2A2A]">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="relative h-32 rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A] flex items-center justify-center">
              <div className="text-center">
                <Camera size={24} className="text-[#C1FF72] mx-auto mb-1" />
                <p className="text-white text-sm">See all Photos</p>
                <p className="text-gray-400 text-xs">(+6)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-white mb-3">Builder Information</h3>
          <p className="text-gray-400 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#2A2A2A] safe-area-inset-bottom">
        <button className="w-full bg-[#C1FF72] text-[#0A0A0A] py-4 rounded-2xl font-bold text-lg hover:bg-[#B0EE61] transition-colors">
          Contact Owner
        </button>
      </div>
    </div>
  );
}
