'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScratchRevealCarousel from './ScratchRevealCarousel';

type Palette = 'gothic' | 'dusk';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const MODEL = {
  name: 'Amber Prada',
  alias: 'Amber',
  tagline: 'Lo que ves es solo el principio.',
  bio: 'Hay partes de mí que las palabras no alcanzan a describir. Mi contenido no es para todos — es para los que saben apreciar lo que va más allá de lo evidente.',
  platformUrl: 'https://www.clips4sale.com/es/studio/459727/the-secret-room',
  platformUrl2: 'https://www.xvideos.com/channels/amber6096',
  photos: Array.from({ length: 9 }, (_, i) => `${BASE}/photos/foto0${i + 1}.jpg`),
  carousel1Photos: ['Modelo11','Modelo12','Modelo13','Modelo14','Modelo16','Modelo17'].map(n => `${BASE}/photos/${n}.jpg`),
  carousel2Photos: ['Modelo18','Modelo19','Modelo20','Modelo21','Modelo22'].map(n => `${BASE}/photos/${n}.jpg`),
  carousel3Photos: ['Modelo23','Modelo24','Modelo25','Modelo26','Modelo27'].map(n => `${BASE}/photos/${n}.jpg`),
  heroVideo: `${BASE}/video/presentacion_AmberPrada.mp4`,
  stats: [
    { label: 'Suscriptores', value: '1.2K+' },
    { label: 'Contenidos exclusivos', value: '200+' },
    { label: 'Valoración', value: '4.9 / 5' },
  ],
  contentTypes: [
    { icon: '📸', title: 'Fotos exclusivas', desc: 'Sets completos que nunca verás en ninguna otra parte.' },
    { icon: '🎬', title: 'Videos personalizados', desc: 'Creados especialmente para ti, con tus indicaciones.' },
    { icon: '💌', title: 'Contenido custom', desc: 'Pídelo, y lo hago realidad. Sin límites.' },
    { icon: '🔒', title: 'Vault privado', desc: 'Acceso a mi archivo más íntimo. Solo para suscriptores.' },
  ],
};

export default function ModelPageClient() {
  const [palette, setPalette] = useState<Palette>('dusk');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div
      data-palette={palette}
      style={{ background: 'var(--model-bg)', color: 'var(--model-text)', minHeight: '100vh' }}
    >
      {/* ── Palette toggle ── */}
      <div className="fixed top-5 right-4 z-50 flex gap-1.5">
        {(['gothic', 'dusk'] as Palette[]).map(p => (
          <button
            key={p}
            onClick={() => setPalette(p)}
            className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-sm border font-body transition-all duration-300"
            style={{
              borderColor: palette === p ? 'var(--model-accent)' : 'rgba(255,255,255,0.12)',
              background: palette === p ? 'var(--model-soft)' : 'rgba(0,0,0,0.55)',
              color: palette === p ? 'var(--model-accent2)' : 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {p}
          </button>
        ))}
      </div>



      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden flex items-end justify-end">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={MODEL.photos[0]}
          >
            <source src={MODEL.heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, var(--model-bg) 0%, rgba(0,0,0,0.35) 40%, transparent 100%)'
          }} />
        </motion.div>

        {/* Content — right aligned */}
        <motion.div
          className="relative z-10 w-full px-6 md:px-14 pb-16 md:pb-24 flex justify-end"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-xl text-right">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-body text-[10px] tracking-[0.5em] uppercase mb-4"
              style={{ color: 'var(--model-accent2)' }}
            >
              ✦ &nbsp; Osadía by Sade &nbsp; ✦
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="font-display text-6xl sm:text-8xl md:text-9xl leading-none mb-4"
              style={{ color: 'var(--model-text)' }}
            >
              {MODEL.name.split(' ')[0]}
              <br />
              <span style={{ color: 'var(--model-accent)', WebkitTextStroke: '1px var(--model-accent)' }}>
                {MODEL.name.split(' ')[1]}
              </span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-px mb-6 origin-right ml-auto"
              style={{ background: 'linear-gradient(270deg, var(--model-accent), transparent)' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-heading italic text-xl md:text-2xl mb-8"
              style={{ color: 'var(--model-muted)', fontWeight: 300 }}
            >
              {MODEL.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex justify-end"
            >
              <a
                href={MODEL.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-model inline-block px-10 py-4 text-sm tracking-[0.25em] font-body font-semibold rounded-sm heartbeat"
              >
                <span>ENTRAR AL CONTENIDO EXCLUSIVO</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--model-accent), transparent)' }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ══════════════ SCRATCH REVEAL ══════════════ */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ background: 'var(--model-bg)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, var(--model-soft) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'var(--model-accent)' }}>
              ✦ &nbsp; Solo para los curiosos
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--model-text)' }}>
              ¿TE ATREVES A MIRAR?
            </h2>
            <p className="font-heading italic" style={{ color: 'var(--model-muted)', fontWeight: 300 }}>
              Toca o desliza para descubrir. Lo que reveles, es tuyo.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[MODEL.carousel1Photos, MODEL.carousel2Photos, MODEL.carousel3Photos].map((photos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <ScratchRevealCarousel
                  photos={photos}
                  modelName={MODEL.name}
                  platformUrl={MODEL.platformUrl}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTENT TYPES ══════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: 'var(--model-bg2)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'var(--model-accent)' }}>
              ✦ &nbsp; Qué encontrarás
            </p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: 'var(--model-text)' }}>
              CONTENIDO EXCLUSIVO
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODEL.contentTypes.map((ct, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative rounded-sm p-6 text-center shimmer-card cursor-default group"
                style={{ border: '1px solid var(--model-border)' }}
              >
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, var(--model-soft), transparent)' }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500">{ct.icon}</div>
                  <h3 className="font-heading text-lg mb-2" style={{ color: 'var(--model-text)', fontWeight: 500 }}>{ct.title}</h3>
                  <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--model-muted)', fontWeight: 300 }}>{ct.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SOCIAL PROOF ══════════════ */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ background: 'var(--model-bg)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, var(--model-soft) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-sm p-10 md:p-14"
            style={{ border: '1px solid var(--model-border)', background: 'var(--model-bg2)' }}
          >
            <p className="text-5xl mb-6" style={{ filter: 'grayscale(0.3)' }}>🔥</p>
            <p className="font-heading italic text-xl md:text-2xl mb-6 leading-relaxed" style={{ color: 'var(--model-text)', fontWeight: 300 }}>
              &ldquo;Llevaba tiempo buscando contenido real, sin filtros ni poses. Amber es diferente — auténtica, provocadora y siempre sorprende.&rdquo;
            </p>
            <p className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--model-muted)' }}>— Suscriptor verificado</p>
            <div className="h-px my-8" style={{ background: 'linear-gradient(90deg, transparent, var(--model-accent), transparent)' }} />
            <div className="flex justify-center gap-10">
              {MODEL.stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <p className="font-display text-3xl md:text-4xl" style={{ color: 'var(--model-accent2)' }}>{s.value}</p>
                  <p className="font-body text-[9px] tracking-widest uppercase mt-1" style={{ color: 'var(--model-muted)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="relative overflow-hidden" style={{ background: 'var(--model-bg)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, var(--model-soft) 0%, transparent 55%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: copy + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--model-accent)' }}>
                ✦ &nbsp; No te quedes con las ganas
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{ color: 'var(--model-text)' }}>
                LO MEJOR<br />
                <span style={{ color: 'var(--model-accent)' }}>ESTÁ ADENTRO</span>
              </h2>
              <p className="font-heading italic text-lg mb-10 leading-relaxed" style={{ color: 'var(--model-muted)', fontWeight: 300 }}>
                {MODEL.stats[0].value} personas ya tienen acceso a lo que tú todavía no has visto.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <motion.a
                  href={MODEL.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-model px-8 py-4 text-sm tracking-[0.2em] font-body font-bold rounded-sm text-center"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>CLIPS4SALE →</span>
                </motion.a>
                <motion.a
                  href={MODEL.platformUrl2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-sm tracking-[0.2em] font-body font-semibold rounded-sm text-center border transition-all duration-300"
                  style={{ borderColor: 'var(--model-border)', color: 'var(--model-muted)' }}
                  whileHover={{ scale: 1.04, borderColor: 'var(--model-accent2)', color: 'var(--model-text)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  XVIDEOS →
                </motion.a>
              </div>
              <p className="font-body text-[10px] tracking-wider" style={{ color: 'var(--model-muted)', opacity: 0.45 }}>
                Acceso inmediato · Contenido nuevo cada semana
              </p>
            </motion.div>

            {/* Right: foto09 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden"
              style={{ border: '1px solid var(--model-border)', boxShadow: '0 0 60px var(--model-glow)' }}
            >
              <Image
                src={`${BASE}/photos/Model_footer.jpg`}
                alt={MODEL.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to left, transparent 55%, var(--model-bg) 100%)'
              }} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, var(--model-bg) 0%, transparent 25%)'
              }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="py-12 px-6 md:px-12" style={{ borderTop: '1px solid var(--model-border)', background: 'var(--model-bg2)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative h-10 w-36">
              <Image
                src={`${BASE}/logos/firma_osadia.jpeg`}
                alt="Osadía by Sade"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="w-px h-7 hidden sm:block" style={{ background: 'var(--model-border)' }} />
            <div className="relative h-10 w-24">
              <Image
                src={`${BASE}/logos/firma_rawstone.jpeg`}
                alt="Raw Stone Producciones"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-body text-[10px] tracking-widest uppercase" style={{ color: 'var(--model-muted)' }}>
              © {new Date().getFullYear()} Osadía by Sade · Raw Stone Producciones
            </p>
            <p className="font-body text-[9px] mt-1" style={{ color: 'var(--model-muted)', opacity: 0.5 }}>
              Contenido exclusivo para adultos mayores de 18 años
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
