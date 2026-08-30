import { useNavigate } from 'react-router-dom';
import { Heart, User, Users } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';

export default function HomeScreen() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: User,
      title: 'Patient View',
      subtitle: 'For the person using memory support — memories, people, and reminders in a calm, simple layout.',
      action: () => navigate('/patient'),
    },
    {
      icon: Users,
      title: 'Caregiver View',
      subtitle: 'For family and caregivers to review notes, manage reminders, and stay connected.',
      action: () => navigate('/caregiver'),
    },
  ];

  return (
    <div className="min-h-screen bg-page-bg">
      <HeroBanner subtitle="Helping you hold onto the people and moments that matter." />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-ink">Welcome to Recallia</h2>
          <p className="mt-2 text-lg text-ink-soft">
            Choose how you'd like to use the app today.
          </p>
        </div>

        <div className="space-y-4">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={card.action}
              className="flex w-full items-center gap-5 rounded-xl border border-gray-200 bg-card-bg p-7 text-left shadow-card transition-all hover:border-primary/40 hover:shadow-lg active:scale-[0.99]"
            >
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-pill-bg">
                <card.icon className="h-8 w-8 text-primary" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-2xl font-bold text-ink">{card.title}</p>
                <p className="mt-1 text-base text-ink-soft">{card.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <Heart className="h-4 w-4 text-accent" />
          <span>Made with care for every moment that matters.</span>
        </div>
      </main>
    </div>
  );
}
