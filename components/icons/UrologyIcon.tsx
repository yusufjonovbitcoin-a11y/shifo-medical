export function UrologyIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Kidneys */}
      <path
        d="M20 18C14 18 10 24 10 30C10 36 12 44 16 48C18 50 22 50 24 48C26 46 28 42 28 38C28 34 26 30 24 28C22 26 20 24 20 22C20 20 20 18 20 18Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M44 18C50 18 54 24 54 30C54 36 52 44 48 48C46 50 42 50 40 48C38 46 36 42 36 38C36 34 38 30 40 28C42 26 44 24 44 22C44 20 44 18 44 18Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Bladder */}
      <ellipse cx="32" cy="48" rx="10" ry="8" fill="currentColor" opacity="0.5" />
      {/* Connecting tubes */}
      <path
        d="M24 28C26 32 28 36 28 38L28 42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 28C38 32 36 36 36 38L36 42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Main outline */}
      <path
        d="M20 18C14 18 10 24 10 30C10 36 12 44 16 48C18 50 22 50 24 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M44 18C50 18 54 24 54 30C54 36 52 44 48 48C46 50 42 50 40 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}














