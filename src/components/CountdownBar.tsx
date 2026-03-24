import { useEffect, useMemo, useState } from 'react';
import { Server, Download, CheckCircle2 } from 'lucide-react';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

type Phase = {
  id: number;
  name: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
};

const COUNTDOWN_STORAGE_KEY = 'andesmp-countdown-target-utc';

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

  const target = nowMs + (3 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000);
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

function getPhases(remaining: CountdownParts): Phase[] {
  const daysRemaining = remaining.days + remaining.hours / 24;
  
  return [
    {
      id: 1,
      name: 'Inicializando Servidor',
      icon: <Server className="w-4 h-4" />,
      active: daysRemaining >= 1,
      completed: daysRemaining < 1,
    },
    {
      id: 2,
      name: 'Launcher Listo',
      icon: <Download className="w-4 h-4" />,
      active: daysRemaining < 1 && !remaining.completed,
      completed: remaining.completed,
    },
    {
      id: 3,
      name: 'Evento Iniciado',
      icon: <CheckCircle2 className="w-4 h-4" />,
      active: false,
      completed: remaining.completed,
    },
  ];
}

function ClockItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-white/15 bg-black/40 px-2 py-1.5 text-center sm:min-w-[64px] sm:px-3 sm:py-2">
      <p className="text-lg font-semibold text-white tabular-nums sm:text-xl">{String(value).padStart(2, '0')}</p>
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</p>
    </div>
  );
}

function PhaseIndicator({ phases }: { phases: Phase[] }) {
  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center justify-between gap-1 md:gap-3">
        {phases.map((phase) => (
          <div key={phase.id} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all md:h-12 md:w-12 ${
                phase.completed
                  ? 'border-emerald-400 bg-emerald-400/20 text-emerald-400'
                  : phase.active
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300 animate-pulse'
                    : 'border-white/20 bg-white/5 text-white/40'
              }`}
            >
              {phase.icon}
            </div>
            <p
              className={`mt-2 text-center text-xs md:text-sm font-medium leading-tight ${
                phase.active || phase.completed ? 'text-white' : 'text-white/40'
              }`}
            >
              {phase.name}
            </p>
          </div>
        ))}
        
        {/* Conectores entre fases */}
        <div className="absolute left-0 right-0 top-5 flex items-center justify-between md:top-6 -z-10">
          {phases.slice(0, -1).map((phase, idx) => (
            <div
              key={`connector-${idx}`}
              className={`flex-1 h-0.5 mx-0.5 md:mx-1 transition-all ${
                phase.completed ? 'bg-emerald-400' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CountdownBar() {
  const targetMs = useMemo(() => getPersistentTargetMs(), []);
  const [remaining, setRemaining] = useState<CountdownParts>(() => getCountdownParts(targetMs));
  const phases = useMemo(() => getPhases(remaining), [remaining]);

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
            <p className="text-sm text-white/75">Apertura Oficial</p>
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

        <div className="relative flex items-center justify-center pt-2">
          <PhaseIndicator phases={phases} />
        </div>
      </div>
    </div>
  );
}