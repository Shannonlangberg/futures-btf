/**
 * Building The Future — homepage
 *
 * Section #1 (Hero) is the only real block in here right now. The rest of the
 * homepage gets added section-by-section against §6 of 00_SITE_BRIEF_v0.1.md.
 *
 * The hero is built against placeholder copy + a brand-toned cinematic backdrop
 * so it holds the design while we wait for the real hero render / vision video
 * and the final headline copy from the vision doc. Both are flagged TODO below.
 */
function App() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
      </main>
    </>
  );
}

/* ----------------------------------------------------------------------------
   Site nav — slim, persistent, sits over the hero. Single right-aligned CTA
   pill in the FLC pattern.
---------------------------------------------------------------------------- */
function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between">
        <a
          href="/"
          className="font-[family-name:var(--font-display)] text-[var(--color-cream-50)] text-lg md:text-xl tracking-tight leading-none"
        >
          Building{' '}
          <em className="italic font-normal text-[var(--color-ember-500)]">the</em>{' '}
          Future
        </a>
        <a
          href="#vision"
          className="text-[var(--color-cream-50)] text-xs md:text-sm tracking-[0.15em] uppercase border border-[var(--color-cream-50)]/25 rounded-full px-5 py-2.5 hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-500)] transition-colors"
        >
          Watch the vision
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------------
   Hero — section #1 of the brief.
   - Full-viewport dark cinematic block
   - Eyebrow → oversized serif headline w/ italic-orange accent → sage subtitle
   - Two CTAs (primary ember pill + ghost link)
   - Scroll hint at the foot
---------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-ink-900)] text-[var(--color-cream-50)]">
      <HeroBackdrop />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* push content into the lower-middle of the frame for the cinematic feel */}
        <div className="flex-1 flex items-end md:items-center px-6 md:px-10 pt-32 md:pt-24 pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            {/* eyebrow */}
            <p className="text-[var(--color-ember-500)] tracking-[0.28em] text-[11px] md:text-xs uppercase mb-8 md:mb-10">
              Building The Future · Futures Church 2026
            </p>

            {/* headline — TODO: replace with real vision-doc headline */}
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.98] tracking-tight max-w-5xl">
              We&rsquo;re building{' '}
              <em className="italic font-normal text-[var(--color-ember-500)]">
                what&rsquo;s&nbsp;next
              </em>
              .
            </h1>

            {/* subtitle — TODO: replace with one tight sentence from the vision doc */}
            <p className="mt-8 md:mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-[var(--color-sage-300)]">
              A vision for the next chapter of Futures Church &mdash; the places
              we&rsquo;re called to build, and the lives they&rsquo;ll hold.
            </p>

            {/* CTAs */}
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="#vision"
                className="inline-flex items-center gap-2 bg-[var(--color-ember-500)] text-[var(--color-ink-900)] rounded-full px-6 py-3 text-sm tracking-wide font-medium hover:bg-[var(--color-ember-400)] transition-colors"
              >
                Watch the vision <span aria-hidden>→</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-[var(--color-cream-50)] rounded-full px-6 py-3 text-sm tracking-wide hover:text-[var(--color-ember-500)] transition-colors"
              >
                See the projects
              </a>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-10 flex items-center gap-3 text-[var(--color-sage-300)]/60 text-[10px] md:text-xs uppercase tracking-[0.35em]">
          <span className="h-px w-10 bg-current" aria-hidden />
          Scroll
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Hero backdrop — placeholder cinematic treatment.
   Layered radial + linear gradients evoke the "rays / pathway to horizon"
   motif from the FUT002 brand guide. Designed to feel intentional on its own
   AND to be the right canvas under a real hero render or looping video later.
   When real media lands, swap the backdrop layers for an <img> or <video>
   with a dark overlay.
---------------------------------------------------------------------------- */
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {/* base — warm rust → ink diagonal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, var(--color-rust-900) 0%, var(--color-ink-900) 55%, var(--color-ink-900) 100%)',
        }}
      />

      {/* warm spotlight from upper right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 78% 22%, rgba(233,112,50,0.40), transparent 65%)',
        }}
      />

      {/* horizon glow — soft warm band along the lower edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            'linear-gradient(to top, rgba(198,74,44,0.18) 0%, rgba(198,74,44,0.06) 35%, transparent 70%)',
        }}
      />

      {/* rays — very faint diagonal striping picks up on the brand motif */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(108deg, transparent 0 90px, rgba(250,246,239,0.05) 90px 92px)',
        }}
      />

      {/* vignette to anchor the type and add depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 80% at 50% 55%, transparent 45%, rgba(26,18,14,0.75) 100%)',
        }}
      />
    </div>
  );
}

export default App;
