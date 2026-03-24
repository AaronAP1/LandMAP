import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const COUNTDOWN_STORAGE_KEY = 'andesmp-countdown-target-utc';

function getNowMs(): number {
  return Date.now();
}

function getCountdownParts(): CountdownParts {
  const stored = window.localStorage.getItem(COUNTDOWN_STORAGE_KEY);
  const storedNumber = stored ? Number(stored) : NaN;
  const now = getNowMs();
  
  if (!Number.isFinite(storedNumber)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: false };
  }

  const distance = Math.max(storedNumber - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    completed: distance === 0,
  };
}

export default function LauncherAlert() {
  const [remaining, setRemaining] = useState<CountdownParts>(getCountdownParts);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setRemaining(getCountdownParts());
    const timer = window.setInterval(() => {
      setRemaining(getCountdownParts());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const shouldShow = remaining.days <= 2 && remaining.days > 0 && !dismissed;

  if (!shouldShow) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm animate-in slide-in-from-bottom-4">
      <Alert className="border-emerald-500/50 bg-emerald-950/80 backdrop-blur-sm">
        <AlertCircle className="h-4 w-4 text-emerald-400" />
        <AlertDescription className="text-emerald-100">
          <p className="font-semibold mb-1">¡Casi listo!</p>
          <p className="text-sm">
            En <span className="font-bold">{remaining.days} día{remaining.days > 1 ? 's' : ''}</span> estará disponible la descarga del launcher.
          </p>
        </AlertDescription>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 p-1 hover:bg-emerald-900/50 rounded transition-colors"
        >
          <X className="h-4 w-4 text-emerald-400" />
        </button>
      </Alert>
    </div>
  );
}
