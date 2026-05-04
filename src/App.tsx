/**
 * Building The Future — homepage
 *
 * Visual language is reset to match the BTF campaign Design Assets pack:
 *   - Cream paper background (not dark cinematic).
 *   - Heavy black condensed caps for headlines (Acumin Pro Condensed Ultra Black).
 *   - GalGothic Light for body.
 *   - Yellow horizontal strips as section dividers (campaign accent #ffc72c).
 *   - Section title PNGs from /media/titles/ as the headline graphics for pillars.
 *
 * Section #1 (Hero) is real. Sections #2–#10 still to come, built section-by-
 * section against §6 of 00_SITE_BRIEF_v0.1.md.
 *
 * TODOs marked inline below — final headline copy from the vision doc, real
 * portrait, real anchor render etc.
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
   Site nav — slim, persistent, sits over the cream hero. Dark wordmark left,
   ghost CTA right. Single right-aligned action in the FLC pattern.
---------------------------------------------------------------------------- */
function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[var(--color-cream-50)]/85 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
        <a
          href="/"
          className="font-[family-name:var(--font-display)] text-[var(--color-ink-900)] text-sm md:text-base tracking-[0.18em] uppercase leading-none"
        >
          Building <span className="text-[var(--color-gold-600)]">The</span> Future
        </a>
        <a
          href="#vision"
          className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.22em] uppercase border border-[var(--color-ink-900)]/25 rounded-full px-4 md:px-5 py-2 md:py-2.5 hover:bg-[var(--color-ink-900)] hover:text-[var(--color-cream-50)] hover:border-[var(--color-ink-900)] transition-colors"
        >
          Watch the vision
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------------
   Hero — section #1 of the brief, BTF campaign poster treatment.
   Cream background. Massive black-caps Acumin headline, gold accent word.
   Yellow strip divider. GalGothic body. Dark CTA pill.
---------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-cream-50)] text-[var(--color-ink-900)]">
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center px-6 md:px-10 pt-32 pb-16">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* eyebrow */}
            <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-8 md:mb-10">
              Futures Church · 2026 Vision
            </p>

            {/* headline — TODO: confirm wording from vision doc */}
            <h1
              className="font-[family-name:var(--font-display)] uppercase leading-[0.86] tracking-[-0.015em] text-[var(--color-ink-900)]"
              style={{ fontSize: 'clamp(3.25rem, 13vw, 13rem)' }}
            >
              We&rsquo;re Building
              <br />
              The <span className="text-[var(--color-gold-500)]">Future</span>
              <span className="text-[var(--color-gold-500)]">.</span>
            </h1>

            {/* yellow strip — campaign motif */}
            <div
              className="mt-8 md:mt-10 h-3 md:h-4 bg-[var(--color-gold-500)] w-full max-w-[760px]"
              aria-hidden
            />

            {/* lead — GalGothic Light */}
            <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl lg:text-2xl leading-[1.45] text-[var(--color-ink-900)]/85">
              A vision for the next chapter of Futures Church &mdash; five pillars,
              one future, and the offering that builds it.
            </p>

            {/* CTAs */}
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="#vision"
                className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 bg-[var(--color-ink-900)] text-[var(--color-cream-50)] px-7 py-4 text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-gold-500)] hover:text-[var(--color-ink-900)] transition-colors"
              >
                Watch the vision <span aria-hidden>→</span>
              </a>
              <a
                href="#pillars"
                className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 px-5 py-4 text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-ink-900)]/80 hover:text-[var(--color-ink-900)] transition-colors"
              >
                See the five pillars
              </a>
            </div>

            {/* footer ribbon — campaign action ladder */}
            <div className="mt-16 md:mt-24 flex items-center gap-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-[var(--color-ink-900)]/55 font-[family-name:var(--font-display)]">
              <span aria-hidden className="h-px w-10 bg-current" />
              Pray · Prepare · Pledge · Commit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
