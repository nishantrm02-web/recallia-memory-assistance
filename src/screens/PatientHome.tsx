import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookHeart, UserSearch, Bell } from 'lucide-react';
import Layout from '@/components/Layout';

export default function PatientHome() {
  const navigate = useNavigate();

  const items = [
    {
      icon: BookHeart,
      title: 'My Memories',
      subtitle: 'Stories and moments from your life',
      action: () => navigate('/memories'),
    },
    {
      icon: UserSearch,
      title: 'Remember Who',
      subtitle: 'Faces and names of people you love',
      action: () => navigate('/recognize'),
    },
    {
      icon: Bell,
      title: 'My Reminders',
      subtitle: 'What to do today',
      action: () => navigate('/reminders'),
    },
  ];

  return (
    <Layout subtitle="Helping you hold onto the people and moments that matter." showBack={false}>
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-ink">Hello, friend.</h2>
        <p className="mt-2 text-lg text-ink-soft">
          What would you like to do today?
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-card-bg p-6 text-left shadow-row transition-all hover:border-primary/30 hover:shadow-card active:scale-[0.99]"
          >
            <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-pill-bg">
              <item.icon className="h-8 w-8 text-primary" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-2xl font-bold text-ink">{item.title}</p>
              <p className="mt-1 text-lg text-ink-soft">{item.subtitle}</p>
            </div>
            <ChevronRight className="h-7 w-7 flex-none text-ink-soft" strokeWidth={1.75} />
          </button>
        ))}
      </div>
    </Layout>
  );
}
