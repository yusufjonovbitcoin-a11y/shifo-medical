export function YandexMapsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Yandex Maps"
    >
      {/* Map pin/marker icon - Yandex Maps style */}
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        fill="white"
      />
    </svg>
  );
}

