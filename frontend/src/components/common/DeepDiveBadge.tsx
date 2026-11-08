interface DeepDiveBadgeProps {
  /** 'icon' is a compact icon for tight spaces; 'label' adds the text. */
  variant?: 'icon' | 'label';
  className?: string;
}

const TITLE = 'Deep dive available';

function Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 2 1 6.5 10 11l9-4.5L10 2z" />
      <path d="m1.9 9.4-.9.45L10 14.4l9-4.55-.9-.45L10 13.4 1.9 9.4z" />
      <path d="m1.9 12.9-.9.45L10 17.9l9-4.55-.9-.45L10 16.9l-8.1-4z" />
    </svg>
  );
}

/** Marks a battle that has a deep-dive (timeline + unit positions) view. */
export default function DeepDiveBadge({ variant = 'icon', className = '' }: DeepDiveBadgeProps) {
  if (variant === 'label') {
    return (
      <span
        title={TITLE}
        className={`inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded ${className}`}
      >
        <Icon className="w-3 h-3" />
        Deep dive
      </span>
    );
  }
  return (
    <span title={TITLE} className={`inline-flex ${className}`}>
      <Icon className="w-3 h-3" />
    </span>
  );
}
