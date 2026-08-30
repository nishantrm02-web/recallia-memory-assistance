import { Trash2, ArrowLeft } from 'lucide-react';
import type { Memory } from '@/types';
import { useMemories } from '@/context/MemoryContext';
import Layout from '@/components/Layout';

interface MemoryDetailProps {
  memory: Memory;
  onBack: () => void;
}

export default function MemoryDetail({ memory, onBack }: MemoryDetailProps) {
  const { deleteMemory } = useMemories();

  const handleDelete = () => {
    deleteMemory(memory.id);
    onBack();
  };

  return (
    <Layout subtitle="Helping you hold onto the people and moments that matter." showBack={false}>
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary-50"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to memories
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-card-bg shadow-card">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-pill-bg">
          <img
            src={memory.photoUrl}
            alt={memory.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8">
          <h2 className="font-serif text-3xl font-bold text-ink">{memory.name}</h2>
          <p className="mt-1 text-xl font-semibold text-accent">{memory.relationship}</p>

          {memory.note && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Memory</p>
              <p className="mt-2 text-xl leading-relaxed text-ink">{memory.note}</p>
            </div>
          )}

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Saved on</p>
            <p className="mt-1 text-base text-ink-soft">
              {new Date(memory.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <button
            onClick={handleDelete}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-200 py-4 text-lg font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
            Remove this memory
          </button>
        </div>
      </div>
    </Layout>
  );
}
