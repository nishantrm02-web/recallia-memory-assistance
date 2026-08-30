import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeroBanner from './HeroBanner';

interface LayoutProps {
  children: React.ReactNode;
  subtitle?: string;
  showBack?: boolean;
}

export default function Layout({
  children,
  subtitle,
  showBack = true,
}: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-page-bg">
      <HeroBanner subtitle={subtitle} />
      <main className="mx-auto max-w-3xl px-6 py-8">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
