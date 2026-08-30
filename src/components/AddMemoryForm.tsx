import { useState, useRef } from 'react';
import { ArrowLeft, Camera, X } from 'lucide-react';
import type { Relationship } from '@/types';
import { useMemories } from '@/context/MemoryContext';
import Layout from '@/components/Layout';

const RELATIONSHIPS: Relationship[] = [
  'Daughter',
  'Son',
  'Spouse',
  'Grandchild',
  'Friend',
  'Sibling',
  'Caregiver',
  'Other',
];

interface AddMemoryFormProps {
  onClose: () => void;
}

export default function AddMemoryForm({ onClose }: AddMemoryFormProps) {
  const { addMemory } = useMemories();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<Relationship>('Daughter');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError('');
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name.');
      return;
    }
    if (!photoUrl) {
      setError('Please add a photo.');
      return;
    }
    addMemory({
      name: name.trim(),
      relationship,
      photoUrl,
      note: note.trim(),
    });
    onClose();
  };

  return (
    <Layout subtitle="Helping you hold onto the people and moments that matter." showBack={false}>
      <button
        onClick={onClose}
        className="mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary-50"
      >
        <ArrowLeft className="h-5 w-5" />
        Cancel
      </button>

      <div className="rounded-xl border border-gray-200 bg-card-bg p-8 shadow-card">
        <h2 className="mb-6 font-serif text-3xl font-bold text-ink">Add a Memory</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Photo
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {photoUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-gray-200">
                <img src={photoUrl} alt="Preview" className="aspect-[4/3] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoUrl('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  aria-label="Remove photo"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-pill-bg/50 transition-colors hover:border-primary hover:bg-pill-bg/80"
              >
                <Camera className="h-10 w-10 text-ink-soft" strokeWidth={1.5} />
                <span className="text-lg font-semibold text-ink-soft">Tap to add a photo</span>
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Margaret"
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Relationship */}
          <div>
            <label htmlFor="relationship" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Relationship
            </label>
            <select
              id="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value as Relationship)}
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {RELATIONSHIPS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Memory Note <span className="normal-case text-ink-soft/60">(optional)</span>
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Loves gardening, visits every Sunday"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-base font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-card transition-colors hover:bg-primary-dark active:scale-[0.99]"
          >
            Save Memory
          </button>
        </form>
      </div>
    </Layout>
  );
}
