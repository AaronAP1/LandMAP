import { useEffect, useState } from 'react';

const ROOM_ID = '85568392936601477';
const HIDE_AFTER = 80;

export default function CountdownBar() {
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > HIDE_AFTER);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(ROOM_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      aria-hidden={hidden}
      className={`fixed left-0 right-0 top-16 z-40 px-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-8 ${
        hidden
          ? 'pointer-events-none -translate-y-6 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 border border-white/20 bg-[#101010]/95 px-3 py-4 backdrop-blur-md sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Servidor Online</p>
            <p className="text-sm text-white/75">Semana Pruebas </p>
          </div>
        </div>

        <div className="mt-1 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/75 sm:text-sm">ID Sala: <span className="font-semibold text-white">{ROOM_ID}</span></p>
          <button
            type="button"
            onClick={copyRoomId}
            className="w-full rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-emerald-400 sm:w-auto sm:text-sm"
          >
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  );
}