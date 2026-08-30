import { BookHeart, UserSearch, Bell, ChevronRight, Pill, Utensils, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { useMemories } from '@/context/MemoryContext';
import type { ReminderType } from '@/types';

const typeIcons: Record<ReminderType, typeof Pill> = {
  Medicine: Pill,
  Meal: Utensils,
  Routine: Clock,
  Appointment: Calendar,
};

export default function CaregiverScreen() {
  const { memories, reminders } = useMemories();
  const pendingReminders = reminders.filter((r) => !r.isDone);

  const stats = [
    {
      icon: BookHeart,
      label: 'Memories saved',
      value: memories.length,
    },
    {
      icon: UserSearch,
      label: 'People in circle',
      value: memories.length,
    },
    {
      icon: Bell,
      label: 'Reminders pending',
      value: pendingReminders.length,
    },
  ];

  return (
    <Layout subtitle="Supporting you in caring for your loved one.">
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold text-ink">Caregiver Dashboard</h2>
        <p className="mt-1 text-lg text-ink-soft">
          An overview of your loved one's memory support.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-card-bg p-6 text-center shadow-card"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pill-bg">
              <stat.icon className="h-7 w-7 text-primary" strokeWidth={1.75} />
            </span>
            <p className="mt-3 font-serif text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-serif text-2xl font-bold text-ink">Pending Reminders</h3>
        {pendingReminders.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-card-bg p-6 text-center shadow-row">
            <p className="text-lg text-ink-soft">All caught up — nothing pending.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-card-bg p-5 shadow-row"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-pill-bg">
                  {(() => {
                    const Icon = typeIcons[reminder.type] ?? Bell;
                    return <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />;
                  })()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-bold text-ink">{reminder.title}</p>
                  <p className="text-base text-ink-soft">{reminder.time}</p>
                </div>
                <ChevronRight className="h-6 w-6 flex-none text-ink-soft" strokeWidth={1.75} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-serif text-2xl font-bold text-ink">Recent Memories</h3>
        <div className="space-y-3">
          {memories.slice(0, 3).map((memory) => (
            <div
              key={memory.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-card-bg p-5 shadow-row"
            >
              <span className="h-12 w-12 flex-none overflow-hidden rounded-full bg-pill-bg">
                <img src={memory.photoUrl} alt="" className="h-full w-full object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg font-bold text-ink">{memory.name}</p>
                <p className="text-base text-ink-soft">{memory.relationship}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
