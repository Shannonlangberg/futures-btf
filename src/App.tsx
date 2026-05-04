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
 *   #2  Vision letter from senior pastor  (placeholder portrait + copy)
 *   #6  The Five Pillars
 *   #8a Action ladder — Pray · Prepare · Pledge · Commit (statement.png)
 *   #8b Ways to Give  (placeholder giving channels)
 *
 * Sections still to come, in brief order:
 *   #3  The Anchor Project (full-bleed reveal)
 *   #4  Portfolio grid
 *   #5  Why Now
 *   #7  Voices
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
        <VisionLetter />
        <Pillars />
        <ActionLadder />
        <WaysToGive />
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

/**
 * Section wrapper — standardises horizontal padding, max-width, and vertical
 * rhythm across the homepage. Pass a `tone` to flip cream/ink backgrounds.
 */
function Section({
  id,
  tone = 'cream',
  className = '',
  children,
}: {
  id?: string;
  tone?: 'cream' | 'cream-100' | 'ink';
  className?: string;
  children: React.ReactNode;
}) {
  const bg =
    tone === 'ink'
      ? 'bg-[var(--color-ink-900)] text-[var(--color-cream-50)]'
      : tone === 'cream-100'
      ? 'bg-[var(--color-cream-100)] text-[var(--color-ink-900)]'
      : 'bg-[var(--color-cream-50)] text-[var(--color-ink-900)]';
  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        {children}
      </div>
    </section>
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
   Hero — section #1 of the brief.
   Full-bleed campaign poster (dl-side2 → btf-hero.jpg) — sunset over the city,
   sun-rays motif, "Building the FUTURE" wordmark baked into the photography.
   Because the headline lives in the image, the HTML overlay is intentionally
   minimal: subtitle + CTAs + action-ladder ribbon, anchored to the dark base
   of the photo for contrast.
---------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-ink-900)] text-white">
      {/* full-bleed campaign hero photograph */}
      <img
        src="/media/hero/btf-hero.jpg"
        alt="Building The Future — sunset over the city, sun-rays rising"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        loading="eager"
        fetchPriority="high"
      />

      {/* dark gradient at the bottom so subtitle + CTAs stay legible
          regardless of where the photo's silhouette ends up */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 via-black/30 to-transparent z-[1]"
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* spacer pushes content to the bottom of the frame */}
        <div className="flex-1" />

        <div className="px-6 md:px-10 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* lead — GalGothic Light over the dark base of the photo */}
            <p className="max-w-2xl text-base md:text-lg lg:text-xl leading-[1.45] text-white/90">
              The vision for the next chapter of Futures Church &mdash; five
              pillars, one future, and the offering that builds it.
            </p>

            {/* CTAs */}
            <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="#pillars"
                className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 bg-[var(--color-gold-500)] text-[var(--color-ink-900)] px-7 py-4 text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors"
              >
                See the five pillars <span aria-hidden>→</span>
              </a>
              <a
                href="#vision"
                className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 px-5 py-4 text-xs md:text-sm tracking-[0.2em] uppercase text-white/85 hover:text-white transition-colors"
              >
                Watch the vision
              </a>
            </div>

            {/* action ladder ribbon */}
            <div className="mt-10 md:mt-14 flex items-center gap-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/65 font-[family-name:var(--font-display)]">
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
   Vision Letter — section #2 of the brief.
   The FLC "founder spotlight" pattern adapted for BTF. Two-column on desktop:
   portrait + signature on the left, eyebrow + headline + letter on the right.
   Stacked on mobile.

   PLACEHOLDERS — all clearly marked TODO:
     - Senior pastor's name (currently "[ Pastor's Name ]")
     - Portrait image (currently a labelled cream tile)
     - Letter copy (currently a 4-paragraph stand-in I drafted; replace with
       the real letter from the senior pastor when it lands)
---------------------------------------------------------------------------- */
function VisionLetter() {
  return (
    <Section id="vision" tone="cream-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* portrait + signature column */}
        <div className="lg:col-span-5 xl:col-span-4">
          {/* TODO: replace with real portrait — drop a JPEG into
              public/media/portraits/senior-pastor.jpg and swap the inner
              placeholder for an <img> tag */}
          <div className="aspect-[4/5] w-full bg-[var(--color-cream-200)] relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-[var(--color-ink-900)]/45">
              <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs">
                Portrait
              </span>
              <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs mt-2">
                — TBC —
              </span>
              <span className="mt-6 max-w-[16ch] text-[11px] md:text-xs leading-snug">
                Drop senior-pastor.jpg into{' '}
                <span className="font-mono">/media/portraits/</span>.
              </span>
            </div>
            <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
          </div>

          {/* signature block */}
          <div className="mt-7 md:mt-8 font-[family-name:var(--font-display)] uppercase">
            <p className="text-base md:text-lg tracking-[0.18em]">
              Pastor [ Name ]
            </p>
            <p className="text-[10px] md:text-xs tracking-[0.32em] text-[var(--color-ink-900)]/60 mt-1.5">
              Senior Pastor · Futures Church
            </p>
          </div>
        </div>

        {/* letter column */}
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
            A Letter From Your Pastor
          </p>

          <h2
            className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.75rem)' }}
          >
            What We&rsquo;re{' '}
            <span className="text-[var(--color-gold-500)]">Building</span>{' '}
            Next.
          </h2>

          <YellowStrip className="mt-6 md:mt-8 w-full max-w-[520px]" />

          {/* letter copy — TODO: replace with the real letter */}
          <div className="mt-8 md:mt-10 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.65] text-[var(--color-ink-900)]/85 space-y-5">
            <p>Dear church family,</p>
            <p>
              Over the last decade you&rsquo;ve watched God do extraordinary
              things in this place. Lives changed. Generations reached. A
              community of faith becoming a community of life. None of it has
              been our doing.
            </p>
            <p>
              Today I want to tell you what I believe God is asking us to build
              next.
            </p>
            <p>
              <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.05em]">
                Building The Future
              </span>{' '}
              is the vision for the season ahead &mdash; five pillars the next
              chapter of Futures Church will be measured by. Souls coming home.
              Disciples being made. Generations growing up in faith. Churches
              being planted. A reach that&rsquo;s both global and local.
            </p>
            <p>
              This is bigger than any one of us. Which is exactly why I&rsquo;m
              asking each of us to be part of it.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="#pillars"
              className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 bg-[var(--color-ink-900)] text-[var(--color-cream-50)] px-7 py-4 text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-gold-500)] hover:text-[var(--color-ink-900)] transition-colors"
            >
              Read the five pillars <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
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
    <Section id="pillars">
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
    </Section>
  );
}

function PillarBlock({ pillar, isLast }: { pillar: Pillar; isLast: boolean }) {
  return (
    <article id={pillar.slug} className="relative">
      {/* number tag */}
      <p className="font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.32em] uppercase text-[var(--color-ink-900)]/45 mb-5 md:mb-7">
        Pillar {pillar.n}
      </p>

      {/* title — rendered as live Acumin text so all pillars share an exact
          type size regardless of word length (the source PNGs varied in width
          which made the section feel uneven). */}
      <h3
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.012em] text-[var(--color-ink-900)] m-0"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 7.5rem)' }}
      >
        {pillar.titleAlt}
      </h3>

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

/* ----------------------------------------------------------------------------
   Action Ladder — section #8a of the brief.
   The PRAY · PREPARE · PLEDGE · COMMIT ladder from statement.png, rebuilt
   in HTML (live Acumin) so the body copy expanding each action stays
   consistent and accessible. Dark ink section to break up the cream rhythm.

   PLACEHOLDERS:
     - Each action's body copy is my draft; replace with the campaign's
       official phrasing if the team has it.
---------------------------------------------------------------------------- */
type Action = {
  n: string;
  word: string;
  body: string;
};

const ACTIONS: Action[] = [
  {
    n: '01',
    word: 'Pray',
    body:
      'Set aside time over the coming weeks to pray for what God is doing in this church and what your part of it looks like.',
  },
  {
    n: '02',
    word: 'Prepare',
    body:
      'Come to a vision night. Read the brief. Sit with your family and decide what stewardship looks like for your household.',
  },
  {
    n: '03',
    word: 'Pledge',
    body:
      'Make a pledge for what you and your household are believing for over the next 12–18 months. Big or small, every pledge counts.',
  },
  {
    n: '04',
    word: 'Commit',
    body:
      'Stand with us as we build. Show up. Serve. Give. Tell the story of what God is doing.',
  },
];

function ActionLadder() {
  return (
    <Section id="how-to-be-part" tone="ink">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/65 mb-6 md:mb-8">
        How You Can Be Part
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Four <span className="text-[var(--color-gold-500)]">Actions</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-cream-50)]/80">
        We&rsquo;re asking the church to take four steps with us &mdash; in this
        order, at your own pace, but all the way through.
      </p>

      <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
        {ACTIONS.map((a) => (
          <ActionBlock key={a.n} action={a} />
        ))}
      </div>
    </Section>
  );
}

function ActionBlock({ action }: { action: Action }) {
  return (
    <article>
      <p className="font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.32em] uppercase text-[var(--color-cream-50)]/45 mb-3 md:mb-4">
        {action.n}
      </p>
      <h3
        className="font-[family-name:var(--font-display)] uppercase leading-[0.86] tracking-[-0.012em] text-[var(--color-gold-500)] m-0"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.75rem)' }}
      >
        {action.word}
      </h3>
      <p className="mt-5 md:mt-6 text-base md:text-lg leading-[1.55] text-[var(--color-cream-50)]/80 max-w-[40ch]">
        {action.body}
      </p>
    </article>
  );
}

/* ----------------------------------------------------------------------------
   Ways to Give — section #8b of the brief.
   The practical, transactional follow-up to the action ladder. Card grid of
   four giving channels. All copy + URLs + bank details are placeholders for
   now — clearly TODO-tagged in the data so they're easy to swap.
---------------------------------------------------------------------------- */
type GivingMethod = {
  slug: string;
  name: string;
  body: string;
  detail?: string; // smaller secondary line, e.g. bank reference details
  cta?: { label: string; href: string };
};

const GIVING_METHODS: GivingMethod[] = [
  {
    slug: 'online',
    name: 'Online',
    body:
      'Make your pledge or one-off gift through the secure giving portal. Set up recurring giving in a couple of clicks.',
    cta: {
      label: 'Give online →',
      // TODO: replace with the real giving-portal URL.
      href: '#',
    },
  },
  {
    slug: 'bank',
    name: 'Bank Transfer',
    body:
      'Direct deposit straight from your bank. Use your full name as the reference so we can match the gift to your pledge.',
    // TODO: confirm the BTF account details with the finance team.
    detail: 'BSB 000-000  ·  Acc 0000 0000  ·  Ref: Your full name',
  },
  {
    slug: 'in-person',
    name: 'In Person',
    body:
      'Bring your offering to any weekend service. The team will help you set up a pledge card on the day.',
  },
  {
    slug: 'other',
    name: 'Other Ways',
    body:
      'Shares, property, business gifts &mdash; there are many ways to give. Speak with the BTF team and we’ll walk you through it.',
    cta: {
      label: 'Talk to the team →',
      // TODO: replace with the real BTF contact email.
      href: 'mailto:btf@futures.church',
    },
  },
];

function WaysToGive() {
  return (
    <Section id="ways-to-give">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Practical Steps
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Ways to <span className="text-[var(--color-gold-500)]">Give</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-ink-900)]/80">
        Four ways to make a pledge a real gift. Pick whichever fits your
        family best &mdash; every method goes to the same place.
      </p>

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {GIVING_METHODS.map((m) => (
          <GivingMethodCard key={m.slug} method={m} />
        ))}
      </div>
    </Section>
  );
}

function GivingMethodCard({ method }: { method: GivingMethod }) {
  return (
    <article className="bg-[var(--color-cream-100)] p-8 md:p-10 flex flex-col gap-5 md:gap-6 border-t-4 border-[var(--color-gold-500)]">
      <h3
        className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em] m-0"
        style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
      >
        {method.name}
      </h3>
      <p
        className="text-base md:text-lg leading-[1.55] text-[var(--color-ink-900)]/80 max-w-[44ch] flex-1"
        dangerouslySetInnerHTML={{ __html: method.body }}
      />
      {method.detail && (
        <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.18em] text-xs md:text-sm text-[var(--color-ink-900)]/70 border-t border-[var(--color-ink-900)]/10 pt-4">
          {method.detail}
        </p>
      )}
      {method.cta && (
        <a
          href={method.cta.href}
          className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 self-start text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-ink-900)] border-b-2 border-[var(--color-gold-500)] pb-1 hover:border-[var(--color-ink-900)] transition-colors"
        >
          {method.cta.label}
        </a>
      )}
    </article>
  );
}

export default App;
