import { motion } from 'framer-motion';

function AndesMPIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="black" fillOpacity="0.12" />
      <path d="M18 8L28 26H8L18 8Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function BusIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="black" fillOpacity="0.12" />
      <path d="M8 13C8 11.9 8.9 11 10 11H26C27.1 11 28 11.9 28 13V24H8V13Z" fill="currentColor" opacity="0.8" />
      <rect x="9" y="24" width="4" height="3" rx="1.5" fill="currentColor" />
      <rect x="23" y="24" width="4" height="3" rx="1.5" fill="currentColor" />
      <rect x="9" y="13" width="7" height="5" rx="1" fill="black" fillOpacity="0.2" />
      <rect x="20" y="13" width="7" height="5" rx="1" fill="black" fillOpacity="0.2" />
    </svg>
  );
}

const testimonials = [
  {
    quote: '"Hagamos y demostremos algo nuevo"',
    author: 'Bless',
    role: 'AndesMP',
    icon: <AndesMPIcon />,
    style: {
      background: 'linear-gradient(135deg, #e8eeff 0%, #dde8f7 45%, #e2d9f3 100%)',
    },
    watermark: 'B',
    rounded: 'rounded-xl',
    minH: '420px',
    quoteSize: 'text-xl sm:text-2xl',
  },
  {
    quote: '"Amén"',
    author: 'Diosito',
    role: 'Andes MP',
    icon: <BusIcon />,
    style: {
      background: '#d4f53c',
    },
    watermark: 'D',
    rounded: 'rounded-[20px]',
    minH: '420px',
    quoteSize: 'text-[1.65rem] sm:text-[2rem]',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-[1.55fr_1fr]">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col justify-between overflow-hidden ${t.rounded} p-9 sm:p-11`}
              style={{ minHeight: t.minH, ...t.style }}
            >
              {/* ghost watermark */}
              <div
                className="pointer-events-none absolute bottom-0 right-4 text-[280px] font-black leading-none select-none text-black/[0.055]"
                aria-hidden
              >
                {t.watermark}
              </div>

              <blockquote className={`relative z-10 ${t.quoteSize} font-normal leading-[1.22] tracking-[-0.01em] text-[#0d1117]`}>
                {t.quote}
              </blockquote>

              <div className="relative z-10 mt-12 flex items-center gap-3 text-[#0d1117]">
                {t.icon}
                <div>
                  <div className="text-[15px] font-semibold leading-tight">{t.author}</div>
                  <div className="text-[13px] text-[#0d1117]/55 leading-tight mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
