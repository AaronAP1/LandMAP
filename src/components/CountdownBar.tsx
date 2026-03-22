import { useEffect, useMemo, useState } from 'react';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function getCountdownParts(targetMs: number): CountdownParts {
  const now = Date.now();
  const distance = Math.max(targetMs - now, 0);

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

function ClockItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-white/15 bg-black/40 px-2 py-1.5 text-center sm:min-w-[64px] sm:px-3 sm:py-2">
      <p className="text-lg font-semibold text-white tabular-nums sm:text-xl">{String(value).padStart(2, '0')}</p>
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</p>
    </div>
  );
}

export default function CountdownBar() {
  const targetMs = useMemo(() => Date.now() + 5 * 24 * 60 * 60 * 1000, []);
  const [remaining, setRemaining] = useState<CountdownParts>(() => getCountdownParts(targetMs));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getCountdownParts(targetMs));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetMs]);

  return (
    <div className="fixed left-0 right-0 top-16 z-40 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 border border-white/20 bg-[#101010]/95 px-3 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Cuenta regresiva</p>
          <p className="text-sm text-white/75">Cierre del evento en vivo</p>
        </div>

        {remaining.completed ? (
          <p className="text-center text-sm font-medium text-white sm:text-right">El evento ya comenzo.</p>
        ) : (
          <div className="grid w-full grid-cols-4 gap-1.5 sm:flex sm:w-auto sm:items-center sm:gap-2">
            <ClockItem value={remaining.days} label="dias" />
            <ClockItem value={remaining.hours} label="horas" />
            <ClockItem value={remaining.minutes} label="min" />
            <ClockItem value={remaining.seconds} label="seg" />
          </div>
        )}
      </div>
    </div>
  );
}