import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ReminderType, ReminderRepeat } from '@/types';
import { useMemories } from '@/context/MemoryContext';
import Layout from '@/components/Layout';

const TYPES: ReminderType[] = ['Medicine', 'Meal', 'Routine', 'Appointment'];
const REPEATS: ReminderRepeat[] = ['Daily', 'Once'];

interface AddReminderFormProps {
  onClose: () => void;
}

export default function AddReminderForm({ onClose }: AddReminderFormProps) {
  const { addReminder } = useMemories();

  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ReminderType>('Medicine');
  const [repeat, setRepeat] = useState<ReminderRepeat>('Daily');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time.trim()) {
      setError('Please enter a time.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a title.');
      return;
    }
    addReminder({
      time: time.trim(),
      title: title.trim(),
      type,
      repeat,
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
        <h2 className="mb-6 font-serif text-3xl font-bold text-ink">Add a Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Time */}
          <div>
            <label htmlFor="time" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Time
            </label>
            <input
              id="time"
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 9:00 AM"
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-ink-soft">
              What to do
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Take blood pressure medicine"
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Type */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">Type</p>
            <div className="grid grid-cols-2 gap-3">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-xl border-2 py-4 text-lg font-bold transition-colors ${
                    type === t
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-card-bg text-ink hover:border-primary/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Repeat */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">Repeat</p>
            <div className="grid grid-cols-2 gap-3">
              {REPEATS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRepeat(r)}
                  className={`rounded-xl border-2 py-4 text-lg font-bold transition-colors ${
                    repeat === r
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-card-bg text-ink hover:border-primary/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
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
            Save Reminder
          </button>
        </form>
      </div>
    </Layout>
  );
}
