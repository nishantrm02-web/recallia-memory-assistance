import { useState } from 'react';
import { useMemories } from '@/context/MemoryContext';
import type { Memory } from '@/types';
import Layout from '@/components/Layout';
import MemoryGrid from '@/components/MemoryGrid';
import MemoryDetail from '@/components/MemoryDetail';
import AddMemoryForm from '@/components/AddMemoryForm';

export default function MemoriesScreen() {
  const { memories } = useMemories();
  const [selected, setSelected] = useState<Memory | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <AddMemoryForm onClose={() => setShowForm(false)} />;
  }

  if (selected) {
    return (
      <MemoryDetail
        memory={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <Layout subtitle="Helping you hold onto the people and moments that matter.">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-ink">My Memories</h2>
        <p className="mt-1 text-lg text-ink-soft">
          {memories.length} {memories.length === 1 ? 'memory' : 'memories'} saved. Tap one to revisit it.
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-card transition-colors hover:bg-primary-dark active:scale-[0.99]"
      >
        Add Memory
      </button>

      <MemoryGrid memories={memories} onSelect={setSelected} />
    </Layout>
  );
}
