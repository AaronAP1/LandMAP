import { useEffect, useMemo, useState } from 'react';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const COUNTDOWN_STORAGE_KEY = 'andesmp-countdown-target-peru';
const PERU_TIME_ZONE = 'America/Lima';

function getNowInPeruMs(): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: PERU_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '00';

  const year = Number(part('year'));
  const month = Number(part('month'));
  const day = Number(part('day'));
  const hour = Number(part('hour'));
  const minute = Number(part('minute'));
  const second = Number(part('second'));

  return Date.UTC(year, month - 1, day, hour, minute, second);
}

function getPersistentTargetMs(): number {
  const stored = window.localStorage.getItem(COUNTDOWN_STORAGE_KEY);
  const storedNumber = stored ? Number(stored) : NaN;
  const peruNow = getNowInPeruMs();

  if (Number.isFinite(storedNumber) && storedNumber > peruNow) {
    return storedNumber;
  }

  const target = peruNow + 5 * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(target));
  return target;
}

function getCountdownParts(targetMs: number): CountdownParts {
  const now = getNowInPeruMs();
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
  const targetMs = useMemo(() => getPersistentTargetMs(), []);
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
          <p className="text-sm text-white/75">Apertura Oficial</p>
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