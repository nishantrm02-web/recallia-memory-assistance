import type { LucideIcon } from 'lucide-react';

interface ListRowProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  rightIcon?: LucideIcon;
  emojiBadge?: string;
}

export default function ListRow({
  icon: Icon,
  title,
  subtitle,
  onClick,
  rightIcon: RightIcon,
  emojiBadge,
}: ListRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-card-bg p-5 text-left shadow-row transition-all hover:border-primary/30 hover:shadow-card active:scale-[0.99]"
    >
      <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-pill-bg text-2xl">
        {emojiBadge ? (
          <span aria-hidden>{emojiBadge}</span>
        ) : (
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.75} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-xl font-bold text-ink">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-base text-ink-soft">{subtitle}</p>
        )}
      </div>
      {RightIcon && (
        <RightIcon className="h-6 w-6 flex-none text-ink-soft" strokeWidth={1.75} />
      )}
    </button>
  );
}
