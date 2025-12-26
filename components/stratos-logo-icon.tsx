export function StratosLogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Star burst center */}
      <circle cx="30" cy="50" r="8" fill="#B8FF56" />

      {/* Main swoosh/streak */}
      <path d="M 30 50 Q 50 45 95 35 L 98 38 Q 52 48 30 50 Z" fill="#B8FF56" />

      {/* Top star point */}
      <path d="M 30 50 L 28 20 L 30 22 L 32 20 Z" fill="#B8FF56" />

      {/* Bottom star point */}
      <path d="M 30 50 L 28 80 L 30 78 L 32 80 Z" fill="#B8FF56" />

      {/* Left star point */}
      <path d="M 30 50 L 5 48 L 7 50 L 5 52 Z" fill="#B8FF56" />

      {/* Top-right accent */}
      <path d="M 30 50 Q 45 35 60 25 L 58 28 Q 44 37 30 50 Z" fill="#008EFA" opacity="0.6" />
    </svg>
  )
}
