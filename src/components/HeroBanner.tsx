import { Brain } from 'lucide-react';

interface HeroBannerProps {
  subtitle?: string;
}

export default function HeroBanner({
  subtitle = 'Helping you hold onto the people and moments that matter.',
}: HeroBannerProps) {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-primary-light to-primary-dark px-6 pb-7 pt-8 text-white">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <Brain className="h-9 w-9 text-accent-light" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h1 className="font-serif text-3xl font-bold leading-tight text-white">
            Recallia
          </h1>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            Memory Assistance
          </p>
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-lg font-sans text-white/90">
        {subtitle}
      </p>
    </header>
  );
}
