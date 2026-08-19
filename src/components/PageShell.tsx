import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackOutbound } from '../lib/analytics';

const EASE = [0.22, 1, 0.36, 1] as const;

type PageShellProps = {
  /** Etiqueta corta en mono naranja sobre el titulo. */
  eyebrow: string;
  title: string;
  lead: string;
  /** Acciones opcionales bajo el lead (botones). */
  actions?: ReactNode;
  children: ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  lead,
  actions,
  children,
}: PageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pb-24 pt-44 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70%_60%_at_30%_0%,rgba(224,81,47,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="border-b border-white/10 pb-12"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#e0512f]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-[28px] font-normal leading-[1.2] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[44px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/50">
            {lead}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-16"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}

const PRIMARY_CLASS =
  'inline-block bg-[#e0512f] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#f0603c]';
const GHOST_CLASS =
  'inline-block border border-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/80 transition-colors hover:border-white/25 hover:text-white';

/** Boton primario naranja hacia un enlace externo. */
export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutbound(href)}
      className={PRIMARY_CLASS}
    >
      {children}
    </a>
  );
}

/** Boton primario naranja hacia una ruta interna. */
export function PrimaryRoute({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={PRIMARY_CLASS}>
      {children}
    </Link>
  );
}

/** Boton secundario con borde hacia un enlace externo. */
export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutbound(href)}
      className={GHOST_CLASS}
    >
      {children}
    </a>
  );
}

/** Boton secundario con borde hacia una ruta interna. */
export function GhostRoute({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={GHOST_CLASS}>
      {children}
    </Link>
  );
}

/** Etiqueta de seccion en mono naranja. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e0512f]">
      {children}
    </p>
  );
}
