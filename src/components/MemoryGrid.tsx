import type { Memory } from '@/types';

interface MemoryGridProps {
  memories: Memory[];
  onSelect: (memory: Memory) => void;
}

export default function MemoryGrid({ memories, onSelect }: MemoryGridProps) {
  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-pill-bg text-4xl">
          📷
        </span>
        <p className="mt-4 text-lg text-ink-soft">No memories saved yet.</p>
        <p className="mt-1 text-base text-ink-soft">Tap "Add Memory" to create your first one.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {memories.map((memory) => (
        <button
          key={memory.id}
          onClick={() => onSelect(memory)}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-card-bg text-left shadow-row transition-all hover:border-primary/30 hover:shadow-card active:scale-[0.98]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-pill-bg">
            <img
              src={memory.photoUrl}
              alt={memory.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <p className="font-serif text-xl font-bold text-ink">{memory.name}</p>
            <p className="mt-0.5 text-base font-semibold text-accent">{memory.relationship}</p>
            {memory.note && (
              <p className="mt-2 text-base text-ink-soft line-clamp-2">{memory.note}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
