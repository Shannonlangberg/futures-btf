/**
 * Building The Future — homepage
 *
 * Visual language is the BTF campaign Design Assets pack:
 *   - Cream paper background.
 *   - Heavy black condensed caps for headlines (Acumin Pro Condensed Ultra Black).
 *   - GalGothic Light for body.
 *   - Yellow horizontal strips as section dividers (campaign accent #ffc72c).
 *   - Section title PNGs from /media/titles/ as the headline graphics for pillars.
 *
 * Sections built:
 *   #1  Hero
 *   #6  The Five Pillars  (built ahead of order — we have all the assets)
 *
 * Sections still to come, in brief order:
 *   #2  Vision letter from senior pastor
 *   #3  The Anchor Project (full-bleed reveal)
 *   #4  Portfolio grid
 *   #5  Why Now
 *   #7  Voices
 *   #8  How you can be part (uses statement.png — Pray·Prepare·Pledge·Commit)
 *   #9  FAQs
 *   #10 Footer
 *
 * TODOs marked inline below — final copy from the vision doc, real portrait,
 * real anchor render etc.
 */
function App() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Pillars />
      </main>
    </>
  );
}

/* ========================================================================
   Shared atoms
   ======================================================================== */

/** Yellow horizontal strip — recurring campaign motif from the poster. */
function YellowStrip({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-3 md:h-4 bg-[var(--color-gold-500)] ${className}`}
    />
  );
}

/* ----------------------------------------------------------------------------
   Site nav — slim, persistent, sits over the cream hero. Dark wordmark left,
   ghost CTA pill right. Single right-aligned action in the FLC pattern.
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
            <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

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

/* ----------------------------------------------------------------------------
   The Five Pillars — section #6 of the brief.
   Editorial-poster grid. Each pillar is its own block:
       small numbered tag → title PNG → GalGothic body.
   Yellow strips between blocks pick up the campaign rhythm.

   NOTE: copy below is *placeholder* I drafted from the title and the brief —
   replace with the real campaign copy from the vision document.
---------------------------------------------------------------------------- */
type Pillar = {
  n: string;
  slug: string;
  titleSrc: string;
  titleAlt: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    n: '01',
    slug: 'souls',
    titleSrc: '/media/titles/souls.png',
    titleAlt: 'Souls',
    body:
      "We're building a place where people meet Jesus for the first time. Wider doors, clearer message, every seat a seat for someone who hasn't met him yet.",
  },
  {
    n: '02',
    slug: 'discipleship',
    titleSrc: '/media/titles/discipleship.png',
    titleAlt: 'Discipleship',
    body:
      "We're building rooms &mdash; and rhythms &mdash; where faith deepens. Small groups, discipleship pathways, the everyday Christian formed for the long journey.",
  },
  {
    n: '03',
    slug: 'generations',
    titleSrc: '/media/titles/generations.png',
    titleAlt: 'Generations',
    body:
      "We're building for the kids in the foyer and the grandparents in the pew. Spaces that hold every age group of the church, side by side, all the way through.",
  },
  {
    n: '04',
    slug: 'global-and-local',
    titleSrc: '/media/titles/global-and-local.png',
    titleAlt: 'Global & Local',
    body:
      "We're building a church planted right here and reaching everywhere. Local outreach, global missions, partnerships that take the Futures heart beyond the building.",
  },
  {
    n: '05',
    slug: 'church-planting',
    titleSrc: '/media/titles/church-planting.png',
    titleAlt: 'Church Planting',
    body:
      "We're building churches, not just a church. Planting new locations, training leaders, multiplying the model wherever it's called next.",
  },
];

function Pillars() {
  return (
    <section
      id="pillars"
      className="relative bg-[var(--color-cream-50)] text-[var(--color-ink-900)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        {/* section header */}
        <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
          The Vision · 2026 &rarr; 2030
        </p>

        <h2
          className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
        >
          Five <span className="text-[var(--color-gold-500)]">Pillars</span>.
        </h2>

        <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

        <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-ink-900)]/80">
          One vision, five places it lands. Each pillar is a part of what
          we&rsquo;re building &mdash; and a part of what we&rsquo;re asking the
          church to build with us.
        </p>

        {/* pillars list */}
        <div className="mt-20 md:mt-32 flex flex-col gap-20 md:gap-28">
          {PILLARS.map((p, i) => (
            <PillarBlock key={p.slug} pillar={p} isLast={i === PILLARS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarBlock({ pillar, isLast }: { pillar: Pillar; isLast: boolean }) {
  return (
    <article id={pillar.slug} className="relative">
      {/* number tag */}
      <p className="font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.32em] uppercase text-[var(--color-ink-900)]/45 mb-5 md:mb-7">
        Pillar {pillar.n}
      </p>

      {/* title PNG — sized by height so all pillars align visually,
          cropping responsively without distorting the artwork */}
      <img
        src={pillar.titleSrc}
        alt={pillar.titleAlt}
        className="block h-[68px] sm:h-[88px] md:h-[120px] lg:h-[150px] w-auto max-w-full select-none"
        loading="lazy"
        decoding="async"
      />

      {/* body — GalGothic Light, max ~60ch reading width */}
      <p
        className="mt-7 md:mt-9 text-lg md:text-xl lg:text-2xl leading-[1.5] text-[var(--color-ink-900)]/85 max-w-[58ch]"
        // body uses HTML entities for em-dashes — render as raw HTML.
        dangerouslySetInnerHTML={{ __html: pillar.body }}
      />

      {/* yellow strip between blocks (skip after the last) */}
      {!isLast && <YellowStrip className="mt-20 md:mt-28 w-full max-w-[760px]" />}
    </article>
  );
}

export default App;
