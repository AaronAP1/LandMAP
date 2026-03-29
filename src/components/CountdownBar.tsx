import { useEffect, useMemo, useState } from 'react';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const COUNTDOWN_STORAGE_KEY = 'andesmp-countdown-target-utc-v3';

function getNowMs(): number {
  return Date.now();
}

function getPersistentTargetMs(): number {
  const stored = window.localStorage.getItem(COUNTDOWN_STORAGE_KEY);
  const storedNumber = stored ? Number(stored) : NaN;
  const nowMs = getNowMs();

  if (Number.isFinite(storedNumber) && storedNumber > nowMs) {
    return storedNumber;
  }

  const target = nowMs + (1 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (30 * 60 * 1000);
  window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(target));
  return target;
}

function getCountdownParts(targetMs: number): CountdownParts {
  const now = getNowMs();
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 border border-white/20 bg-[#101010]/95 px-3 py-4 backdrop-blur-md sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Cuenta regresiva</p>
            <p className="text-sm text-white/75">Ya falta Poco!! Inscripciones de Empresas en el servidor de Discord!!</p><br /><p className="text-sm text-white/75">Empresas Pre registro: Raraz, Nacional, Judith, Pool Dorado, Civa</p>
          </div>

          {remaining.completed ? (
            <p className="text-center text-sm font-medium text-emerald-400 sm:text-right">¡El evento ya comenzó!</p>
          ) : (
            <div className="grid w-full grid-cols-4 gap-1.5 sm:mt-0 sm:w-auto sm:flex sm:items-center sm:gap-2">
              <ClockItem value={remaining.days} label="dias" />
              <ClockItem value={remaining.hours} label="horas" />
              <ClockItem value={remaining.minutes} label="min" />
              <ClockItem value={remaining.seconds} label="seg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}