import { useState, useMemo } from 'react';
import { Bell, Pill, Utensils, Clock, Calendar, Check, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { useMemories } from '@/context/MemoryContext';
import type { Reminder, ReminderType } from '@/types';
import AddReminderForm from '@/components/AddReminderForm';

const typeIcons: Record<ReminderType, typeof Pill> = {
  Medicine: Pill,
  Meal: Utensils,
  Routine: Clock,
  Appointment: Calendar,
};

const typeLabels: Record<ReminderType, string> = {
  Medicine: 'Medicine',
  Meal: 'Meal',
  Routine: 'Routine',
  Appointment: 'Appointment',
};

function timeToMinutes(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return 0;
  let [, h, m, period] = match;
  let hours = parseInt(h, 10);
  const minutes = parseInt(m, 10);
  if (period) {
    period = period.toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }
  return hours * 60 + minutes;
}

export default function RemindersScreen() {
  const { reminders, toggleReminder } = useMemories();
  const [showForm, setShowForm] = useState(false);

  const sorted = useMemo(
    () => [...reminders].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)),
    [reminders],
  );

  const pending = sorted.filter((r) => !r.isDone);
  const completed = sorted.filter((r) => r.isDone);

  if (showForm) {
    return <AddReminderForm onClose={() => setShowForm(false)} />;
  }

  return (
    <Layout subtitle="Helping you hold onto the people and moments that matter.">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-ink">My Reminders</h2>
        <p className="mt-1 text-lg text-ink-soft">
          {pending.length} {pending.length === 1 ? 'reminder' : 'reminders'} left today.
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-card transition-colors hover:bg-primary-dark active:scale-[0.99]"
      >
        <Plus className="h-5 w-5" />
        Add Reminder
      </button>

      {reminders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                Coming Up
              </p>
              {pending.map((reminder) => (
                <ReminderRow
                  key={reminder.id}
                  reminder={reminder}
                  onToggle={() => toggleReminder(reminder.id)}
                />
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                Done Today
              </p>
              {completed.map((reminder) => (
                <ReminderRow
                  key={reminder.id}
                  reminder={reminder}
                  onToggle={() => toggleReminder(reminder.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

function ReminderRow({
  reminder,
  onToggle,
}: {
  reminder: Reminder;
  onToggle: () => void;
}) {
  const Icon = typeIcons[reminder.type];

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-5 shadow-row transition-colors ${
        reminder.isDone
          ? 'border-gray-100 bg-gray-50'
          : 'border-gray-200 bg-card-bg'
      }`}
    >
      <span
        className={`flex h-14 w-14 flex-none items-center justify-center rounded-full ${
          reminder.isDone ? 'bg-gray-200' : 'bg-pill-bg'
        }`}
      >
        <Icon
          className={`h-7 w-7 ${reminder.isDone ? 'text-ink-soft' : 'text-primary'}`}
          strokeWidth={1.75}
        />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-serif text-lg font-bold ${
              reminder.isDone ? 'text-ink-soft' : 'text-ink'
            }`}
          >
            {reminder.time}
          </span>
          <span
            className={`text-sm font-semibold uppercase tracking-wide ${
              reminder.isDone ? 'text-ink-soft/60' : 'text-accent'
            }`}
          >
            {typeLabels[reminder.type]}
          </span>
        </div>
        <p
          className={`mt-0.5 text-xl font-bold ${
            reminder.isDone ? 'text-ink-soft line-through' : 'text-ink'
          }`}
        >
          {reminder.title}
        </p>
        {reminder.repeat === 'Daily' && (
          <p className="mt-0.5 text-sm text-ink-soft">Repeats daily</p>
        )}
      </div>

      <button
        onClick={onToggle}
        aria-label={reminder.isDone ? 'Mark as not done' : 'Mark as done'}
        className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl border-2 transition-colors ${
          reminder.isDone
            ? 'border-primary bg-primary text-white'
            : 'border-gray-300 bg-white text-transparent hover:border-primary'
        }`}
      >
        {reminder.isDone && <Check className="h-7 w-7" strokeWidth={2.5} />}
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-pill-bg">
        <Bell className="h-12 w-12 text-ink-soft" strokeWidth={1.5} />
      </span>
      <p className="mt-4 text-lg text-ink-soft">No reminders for today.</p>
      <p className="mt-1 text-base text-ink-soft">Tap "Add Reminder" to create one.</p>
    </div>
  );
}
