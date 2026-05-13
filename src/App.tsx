import { useEffect, useState } from 'react';

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
 * Page order (post-restructure 2026-05-05):
 *   1.  Hero  (full-bleed campaign poster)
 *   2.  Building the Future 2026  (heading + intro text, placeholder copy)
 *   3.  What God's Been Doing  (Local + Staff + Vision videos)
 *   4.  New Campuses  (Indonesia 6th, East Coast Australia, Chattanooga TN, Venezuela ×4)
 *   5.  Futures Wellness Centre
 *   6.  Action Ladder — Pray · Prepare · Pledge · Commit
 *   7.  Ways to Give
 *   8.  Stories of Faith  (video placeholder)
 *   9.  FAQs
 *   10. Footer
 *
 * Components retained from the previous structure but no longer rendered
 * (kept for easy revival, prefixed `export` to satisfy noUnusedLocals):
 * VisionLetter, GlobalReach, Pillars (+ PillarBlock + PillarPhotoBreak),
 * Voices (+ Quote), WhyNow, FifteenYears (+ StatCard).
 *
 * TODOs marked inline below — final copy from the vision doc, real portrait,
 * real anchor render etc.
 */
function App() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <BuildingTheFuture2026 />
        <WhatGodsBeenDoing />
        <NewCampuses />
        <WellnessClinic />
        <ActionLadder />
        <WaysToGive />
        <StoriesOfFaith />
        <FAQs />
      </main>
      <Footer />
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
 * Vimeo embed — click-to-play "facade".
 *
 * Until the user hits play we show our own poster (custom image if the
 * caller passes one, otherwise a brand-toned fallback with the section
 * eyebrow). The actual Vimeo iframe only loads on click, which:
 *   - lets us pick a flattering still instead of whatever frame Vimeo
 *     auto-grabs from the video,
 *   - keeps Vimeo's player JS off the critical path until the user opts in.
 */
function VimeoEmbed({
  id,
  hash,
  title,
  posterTitle,
  poster,
  className = '',
}: {
  id: string;
  hash: string;
  /** iframe accessibility title (the actual video name, used by SR + Vimeo). */
  title: string;
  /** Big centered caps shown above the play button while inactive. */
  posterTitle?: string;
  /** Optional custom poster image. If omitted, the brand-toned fallback (warm
   *  dark gradient with subtle ray motif) is used. */
  poster?: { src: string; alt: string };
  className?: string;
}) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    const params = new URLSearchParams({
      h: hash,
      title: '0',
      byline: '0',
      portrait: '0',
      dnt: '1',
      autoplay: '1',
    }).toString();
    return (
      <div
        className={`relative w-full aspect-video bg-[var(--color-ink-900)] overflow-hidden ${className}`}
      >
        <iframe
          src={`https://player.vimeo.com/video/${id}?${params}`}
          title={title}
          frameBorder={0}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play video: ${title}`}
      className={`group relative w-full aspect-video bg-[var(--color-ink-900)] overflow-hidden cursor-pointer block text-left ${className}`}
    >
      {/* Background — custom photo if provided, otherwise brand-toned gradient
          with a subtle ray motif. */}
      {poster ? (
        <img
          src={poster.src}
          alt={poster.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, var(--color-rust-900) 0%, var(--color-ink-900) 60%, var(--color-ink-900) 100%)',
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(108deg, transparent 0 90px, rgba(250,246,239,0.05) 90px 92px)',
            }}
          />
        </div>
      )}

      {/* Subtle darken + hover state */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors"
      />

      {/* Centered stack: poster title (Acumin caps) + play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 md:gap-7 px-6 text-center">
        {posterTitle && (
          <p
            className="font-[family-name:var(--font-display)] uppercase text-white m-0"
            style={{
              fontSize: 'clamp(1.25rem, 3.2vw, 2.5rem)',
              letterSpacing: '0.12em',
              lineHeight: 1.05,
            }}
          >
            {posterTitle}
          </p>
        )}
        <div
          aria-hidden
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-gold-500)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 md:w-9 md:h-9 fill-[var(--color-ink-900)] translate-x-[2px]"
          >
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </div>
      </div>
    </button>
  );
}

/**
 * Scroll-progress indicator — slim yellow bar at the top of the viewport,
 * scaling 0 → 100% across the page. Pure CSS transform, no layout cost.
 */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(max > 0 ? current / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-40 pointer-events-none"
    >
      <div
        className="h-full bg-[var(--color-gold-500)] origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
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
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 md:py-28">
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
        <a href="/" aria-label="Building The Future — home" className="block leading-none">
          <img
            src="/media/general/BTF_logo-black.png"
            alt="Building the Future"
            width={1015}
            height={184}
            className="block h-6 md:h-7 w-auto select-none"
          />
        </a>
        <a
          href="#ways-to-give"
          className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.22em] uppercase border border-[var(--color-ink-900)]/25 rounded-full px-4 md:px-5 py-2 md:py-2.5 hover:bg-[var(--color-ink-900)] hover:text-[var(--color-cream-50)] hover:border-[var(--color-ink-900)] transition-colors"
        >
          Ways to give
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------------
   Hero — section #1 of the brief.
   Campaign poster ("dl-side2") with "Building the FUTURE" wordmark baked into
   the photo. Two responsive behaviours from the same <img>:
     - Mobile (< md): image flows at its natural 2:1 aspect ratio as a banner
       across the top, CTAs + ribbon sit in dark space below. Prevents the
       headline from getting cropped on narrow portrait viewports.
     - Desktop (md+): full-bleed object-cover, CTAs anchored to dark base.
   Image shipped at 1200 / 1800 / 2400 widths via srcset.
---------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink-900)] text-white md:min-h-screen">
      <h1 className="sr-only">
        Building The Future — Futures Church 2026 Vision
      </h1>

      {/* Full-bleed campaign photograph.
          Mobile: in normal flow as a banner at the top (with a top margin to
          clear the fixed nav). Section height = image + CTA area below.
          Desktop: absolutely-positioned, anchored to the bottom of the
          section at full natural width (so the baked-in "Building the
          FUTURE" headline never gets horizontally cropped). The image's
          height bleeds above the viewport on tall screens — the bleed is
          sky, not headline. */}
      <img
        src="/media/hero/btf-hero-1800.jpg"
        srcSet="/media/hero/btf-hero-1200.jpg 1200w, /media/hero/btf-hero-1800.jpg 1800w, /media/hero/btf-hero-2400.jpg 2400w"
        sizes="100vw"
        alt="Sunset over the city skyline. The words 'Building the Future' rise with the sun, sun-rays cresting from the horizon."
        width={2400}
        height={1167}
        loading="eager"
        fetchPriority="high"
        className="block w-full h-auto select-none mt-[64px] md:mt-0 md:absolute md:bottom-0 md:left-0 md:right-0"
      />

      {/* Subtle dark veil — desktop only, where the CTA stack overlays the
          image. On mobile, CTAs sit in plain dark space below the image. */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-x-0 bottom-0 h-2/5 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
        }}
      />

      {/* Content area — just the action-ladder ribbon now (CTAs removed).
          Mobile: sits in flow below the image. Desktop: absolutely pinned
          to the bottom of the (full-screen) section. */}
      <div className="relative z-10 px-6 md:px-10 py-6 md:py-0 md:absolute md:inset-x-0 md:bottom-0 md:pb-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/70 font-[family-name:var(--font-display)]">
            <span aria-hidden className="h-px w-10 bg-current" />
            Pray · Prepare · Pledge · Commit
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Vision message — section #2.
   Video-only: A&J's vision message is the whole section. There's no written
   letter (it's a video, not a letter). The Vimeo poster falls back to the
   campaign hero image until a real video still is provided.
---------------------------------------------------------------------------- */
export function VisionLetter() {
  return (
    <Section id="vision" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        From Your Pastors
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.75rem)' }}
      >
        What We&rsquo;re{' '}
        <span className="text-[var(--color-gold-800)]">Building</span> Next.
      </h2>

      <YellowStrip className="mt-6 md:mt-8 w-full max-w-[520px]" />

      <div className="mt-12 md:mt-16">
        <VimeoEmbed
          id="1188946482"
          hash="076da569fd"
          title="A message from Pastors Ashley & Jane Evans"
          posterTitle="Ps Ashley & Jane Evans"
        />
        <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/55">
          Pastors Ashley &amp; Jane Evans · Senior Pastors
        </p>
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
      "We're building rooms — and rhythms — where faith deepens. Small groups, discipleship pathways, the everyday Christian formed for the long journey.",
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

export function Pillars() {
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
        Five <span className="text-[var(--color-gold-800)]">Pillars</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-ink-900)]/80">
        One vision, five places it lands. Each pillar is a part of what
        we&rsquo;re building &mdash; and a part of what we&rsquo;re asking the
        church to build with us.
      </p>

      {/* Pillars stack — explicitly interleaved with yellow strips and photo
          breaks so the text-heavy section gets visual relief. */}
      <div className="mt-20 md:mt-32 flex flex-col gap-20 md:gap-28">
        <PillarBlock pillar={PILLARS[0]} />
        <YellowStrip className="w-full max-w-[760px]" />
        <PillarBlock pillar={PILLARS[1]} />
        <PillarPhotoBreak
          src="/media/pillars/community-1.jpg"
          alt="The Futures Church family in worship together — hands raised, faces lit, voices high."
        />
        <PillarBlock pillar={PILLARS[2]} />
        <YellowStrip className="w-full max-w-[760px]" />
        <PillarBlock pillar={PILLARS[3]} />
        <PillarPhotoBreak
          src="/media/pillars/community-2.jpg"
          alt="A group of young people gathered in the foyer at Futures, near the kids check-in."
        />
        <PillarBlock pillar={PILLARS[4]} />
      </div>
    </Section>
  );
}

function PillarBlock({ pillar }: { pillar: Pillar }) {
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
      <p className="mt-7 md:mt-9 text-lg md:text-xl lg:text-2xl leading-[1.5] text-[var(--color-ink-900)]/85 max-w-[58ch]">
        {pillar.body}
      </p>
    </article>
  );
}

/**
 * Wide photographic break between pillar blocks. The text-heavy stack reads
 * tighter when it's punctuated by people-photography — same editorial rhythm
 * the inside.jpg poster uses. A thin yellow strip across the bottom edge
 * picks up the campaign motif without making the photo feel boxed in.
 */
function PillarPhotoBreak({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative w-full m-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto max-h-[68vh] object-cover select-none"
      />
      <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
    </figure>
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
      'Rewatch the videos. Read the stories. Let what God has done sink in. Take time to thank Him for His goodness, and then prayerfully decide what faithful generosity looks like for your household in this season.',
  },
  {
    n: '03',
    word: 'Give / Pledge',
    body:
      'On our collection day, bring your faith offering — or make a pledge for what you and your household believe God is calling you to give over the next three months. Big or small, every pledge carries the same spirit; a yes to His vision, a seed into the future.',
  },
  {
    n: '04',
    word: 'Commit',
    body:
      'This is bigger than a one-day offering. Stand with us as we build. Show up. Pray. Serve. Give. And tell the story of what God is doing… because when people hear what He’s done, faith rises and the future gets built together.',
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
   Ways to Give — adapted from the campaign's "How to Give" slide.
   Structure: two columns (Choose Either / Ways to Give) then a bank-details
   block with the real FCSA BTF Project account, then a Questions contact.
---------------------------------------------------------------------------- */
function WaysToGive() {
  return (
    <Section id="ways-to-give" tone="cream">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        How To Give
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Ways to <span className="text-[var(--color-gold-800)]">Give</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      {/* Two columns: timing/commitment + payment methods */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* CHOOSE EITHER */}
        <div>
          <YellowTag>Choose Either</YellowTag>
          <ul className="mt-7 space-y-5 text-base md:text-lg lg:text-xl leading-[1.5] text-[var(--color-ink-900)]/85 list-none p-0">
            <li>One-off offering on Sunday, June 22 or 29</li>
            <li>3-month pledge finishing on Monday, September 29</li>
            <li>A combination of an offering + pledge</li>
          </ul>
        </div>

        {/* WAYS TO GIVE */}
        <div>
          <YellowTag>Ways to Give</YellowTag>
          <ul className="mt-7 space-y-3 text-base md:text-lg lg:text-xl leading-[1.4] text-[var(--color-ink-900)]/85 list-none p-0">
            <li>Cash</li>
            <li>Cheque</li>
            <li>Credit Card</li>
            <li>Direct Debit</li>
            <li>Online Deposit</li>
          </ul>
          <p className="mt-6 text-sm md:text-base italic text-[var(--color-ink-900)]/65 max-w-[40ch]">
            Tax deductibility is available for donation amounts of $5,000 and above.
          </p>
        </div>
      </div>

      {/* Bank account details — real FCSA BTF Project account */}
      <div className="mt-14 md:mt-20 bg-[var(--color-cream-100)] border-t-4 border-[var(--color-gold-500)] p-8 md:p-10 max-w-2xl">
        <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/55">
          For Direct Deposit
        </p>
        <p className="mt-3 font-[family-name:var(--font-display)] uppercase tracking-[0.1em] text-xl md:text-2xl text-[var(--color-ink-900)]">
          FCSA BTF Project
        </p>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-[family-name:var(--font-display)] uppercase tracking-[0.12em] text-base md:text-lg">
          <dt className="text-[var(--color-ink-900)]/55">BSB</dt>
          <dd className="m-0 text-[var(--color-gold-800)]">085-005</dd>
          <dt className="text-[var(--color-ink-900)]/55">Acc No</dt>
          <dd className="m-0 text-[var(--color-gold-800)]">31-405-9072</dd>
          <dt className="text-[var(--color-ink-900)]/55">Reference</dt>
          <dd className="m-0 text-[var(--color-ink-900)]">Your PLEDGE Number</dd>
        </dl>
      </div>

      {/* QUESTIONS */}
      <div className="mt-14 md:mt-20">
        <YellowTag>Questions?</YellowTag>
        <p className="mt-6 text-base md:text-lg text-[var(--color-ink-900)]/80">
          Call our finance team at
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] uppercase tracking-[0.05em] text-2xl md:text-3xl lg:text-4xl">
          <a
            href="tel:+61883600000"
            className="hover:text-[var(--color-gold-800)] transition-colors"
          >
            (08) 8336 0000
          </a>
        </p>
        <p className="mt-4 text-base md:text-lg text-[var(--color-ink-900)]/75">
          Or email{' '}
          <a
            href="mailto:finance@futures.church"
            className="border-b-2 border-[var(--color-gold-500)] pb-0.5 hover:border-[var(--color-ink-900)] transition-colors"
          >
            finance@futures.church
          </a>
        </p>
      </div>
    </Section>
  );
}

/**
 * YellowTag — sticker-style label used to mark the sub-sections inside
 * Ways to Give. Pulls from the campaign "How to Give" slide.
 */
function YellowTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[var(--color-gold-500)] text-[var(--color-ink-900)] font-[family-name:var(--font-display)] uppercase tracking-[0.1em] text-base md:text-xl px-4 py-2 leading-none">
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   Global Reach — section #3.
   Replaces the "Anchor Project + Portfolio" pair from the original brief.
   The BTF offering doesn't fund discrete construction projects; it pours into
   the campaign's pillars. This section makes that real by showing where those
   pillars land — Futures Global College, Indonesia, Brazil, Venezuela.

   PLACEHOLDERS:
     - Per-location body copy is my draft — replace with the real story for
       each region when content lands.
     - Photo tiles are sized slots — drop JPEGs into
       /public/media/global/<slug>.jpg and swap each tile for an <img>.
     - College CTA goes to futuresglobal.college; the others are unlinked
       until you decide whether each gets a deeper page.
---------------------------------------------------------------------------- */
type ReachItem = {
  slug: string;
  name: string;
  region: string;
  body: string;
  /** Optional photo. Drop a JPEG into /public/media/global/<slug>.jpg and the
   *  card will render it instead of the placeholder tile. */
  image?: { src: string; alt: string };
  cta?: { label: string; href: string; external?: boolean };
};

const GLOBAL_REACH: ReachItem[] = [
  {
    slug: 'college',
    name: 'Futures Global College',
    region: 'Adelaide · Online',
    body:
      'Training the next generation of leaders, pastors and missional thinkers — the people God is raising up to plant the church’s next chapter.',
    image: {
      src: '/media/global/college.jpg',
      alt: 'A room full of students mid-worship at Futures Global College, hands raised, with the campaign sun-rays painted on the back wall.',
    },
    cta: {
      label: 'Visit the college →',
      href: 'https://futuresglobal.college',
      external: true,
    },
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    region: 'South-east Asia',
    body:
      'Long-running partnerships with local churches and leaders. The gospel taking root in some of the most populous islands on earth.',
    image: {
      src: '/media/global/indonesia.jpg',
      alt: 'A scene from the Futures partnership in Indonesia.',
    },
  },
  {
    slug: 'brazil',
    name: 'Brazil',
    region: 'South America',
    body:
      'Investing in churches and church planters across Brazil — backing what God is already doing through faithful local leaders.',
    image: {
      src: '/media/global/brazil.jpg',
      alt: 'A scene from the Futures partnership in Brazil.',
    },
  },
  {
    slug: 'venezuela',
    name: 'Venezuela',
    region: 'South America',
    body:
      'Standing with the church in Venezuela through a season the rest of the world has largely forgotten. Discipleship, relief, and resilience.',
    image: {
      src: '/media/global/venezuela.jpg',
      alt: 'A scene from the Futures partnership in Venezuela.',
    },
  },
];

export function GlobalReach() {
  return (
    <Section id="global-reach" tone="cream">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Global · Local
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Across the <span className="text-[var(--color-gold-800)]">World</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-ink-900)]/80">
        The pillars don’t stop at our doorstep. The Building The Future
        offering pours into what God is doing here, in our college, and in the
        nations our church family is rooted to.
      </p>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {GLOBAL_REACH.map((item) => (
          <ReachCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}

function ReachCard({ item }: { item: ReachItem }) {
  return (
    <article id={item.slug} className="flex flex-col">
      {/* Photo: real <img> if `item.image` is set, otherwise placeholder tile. */}
      <div className="aspect-[5/4] bg-[var(--color-ink-900)]/5 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image.src}
            alt={item.image.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-[var(--color-ink-900)]/40">
            <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs">
              Photo
            </span>
            <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs mt-2">
              — TBC —
            </span>
            <span className="mt-5 max-w-[24ch] text-[11px] md:text-xs leading-snug">
              B-roll or landscape from <span className="font-mono">{item.slug}</span>.
            </span>
          </div>
        )}
        <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
      </div>

      <p className="mt-5 font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.32em] uppercase text-[var(--color-ink-900)]/45">
        {item.region}
      </p>
      <h3
        className="mt-2 font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[-0.01em] m-0"
        style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.75rem)' }}
      >
        {item.name}
      </h3>
      <p className="mt-3 text-base md:text-lg leading-[1.5] text-[var(--color-ink-900)]/80 max-w-[42ch]">
        {item.body}
      </p>

      {item.cta && (
        <a
          href={item.cta.href}
          target={item.cta.external ? '_blank' : undefined}
          rel={item.cta.external ? 'noopener noreferrer' : undefined}
          className="mt-5 font-[family-name:var(--font-display)] inline-flex items-center gap-2 self-start text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-ink-900)] border-b-2 border-[var(--color-gold-500)] pb-1 hover:border-[var(--color-ink-900)] transition-colors"
        >
          {item.cta.label}
        </a>
      )}
    </article>
  );
}

/* ----------------------------------------------------------------------------
   Why Now — section #5 of the brief.
   The case for the vision. Editorial dark moment with copy + a pull quote.

   PLACEHOLDER — copy is my draft. Replace with the real "why now" reasoning
   from the vision document.
---------------------------------------------------------------------------- */
export function WhyNow() {
  return (
    <Section id="why-now" tone="ink">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/65 mb-6 md:mb-8">
        The Case
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Why <span className="text-[var(--color-gold-500)]">Now</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      {/* TODO: replace with the real "why now" copy from the BTF team. */}
      <div className="mt-10 md:mt-14 max-w-[58ch] text-lg md:text-xl lg:text-2xl leading-[1.6] text-[var(--color-cream-50)]/85">
        <p>
          [ Placeholder. A short paragraph or two making the case for why this
          season — why this campaign, why this offering, why now. Replace
          when copy lands. ]
        </p>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Voices — section #7 of the brief.
   Pull quotes from leaders / pastors / long-time members.

   PLACEHOLDERS — replace VOICES with real quotes + attributions.
---------------------------------------------------------------------------- */
type Voice = {
  quote: string;
  attribution: string;
  role: string;
};

// Real quotes from each pastor (provided by Shannon).
const VOICES: Voice[] = [
  {
    quote:
      'We’re seeing over 900 kids in our kids programs every week.',
    attribution: 'Ps Renee Watego',
    role: 'Kids Pastor · Futures Church',
  },
  {
    quote:
      'We’re reaching this next generation for Jesus — we’re now in 25 high schools across the state.',
    attribution: 'Ps Seth Behn',
    role: 'Youth Pastor · Futures Church',
  },
  {
    quote:
      'Our reach is getting bigger because that is just what God is doing.',
    attribution: 'Ps Josh Greenwood',
    role: 'Lead Pastor · Futures Church',
  },
];

export function Voices() {
  return (
    <Section id="voices" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Voices
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        What <span className="text-[var(--color-gold-800)]">Jesus</span> is doing.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-ink-900)]/80">
        Hear from the team on what Jesus is doing in this church right now —
        and what we’re being asked to make room for next.
      </p>

      {/* Staff / leadership video — anchors the section */}
      <div className="mt-12 md:mt-16">
        <VimeoEmbed
          id="1183634809"
          hash="9f487d7782"
          title="Hear from the Futures team"
          posterTitle="Testimonies"
        />
        <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/55">
          Voices from the Futures team
        </p>
      </div>

      {/* Supporting quote cards */}
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {VOICES.map((v, i) => (
          <Quote key={i} voice={v} />
        ))}
      </div>
    </Section>
  );
}

function Quote({ voice }: { voice: Voice }) {
  return (
    <blockquote className="bg-[var(--color-cream-100)] p-7 md:p-8 border-t-4 border-[var(--color-gold-500)] flex flex-col gap-5">
      <span
        aria-hidden
        className="font-[family-name:var(--font-display)] text-[var(--color-gold-500)] leading-[0.6] -mb-2"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
      >
        &ldquo;
      </span>
      <p className="text-base md:text-lg leading-[1.5] text-[var(--color-ink-900)]/85 flex-1">
        {voice.quote}
      </p>
      <footer className="font-[family-name:var(--font-display)] uppercase">
        <p className="tracking-[0.18em] text-sm">{voice.attribution}</p>
        <p className="mt-1 tracking-[0.32em] text-[10px] md:text-xs text-[var(--color-ink-900)]/60">
          {voice.role}
        </p>
      </footer>
    </blockquote>
  );
}

/* ----------------------------------------------------------------------------
   FAQs — section #9 of the brief.
   Stacked Q&A list. Non-accordion for v1 — clean, fast, no JS state needed.

   PLACEHOLDERS — replace each entry's `a` with the real answer when the team
   has firmed it up.
---------------------------------------------------------------------------- */
type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: 'When does the campaign start?',
    a:
      'The Building The Future offering lands on Sunday, June 22 and Sunday, June 29 — that’s when you bring a one-off offering, begin a 3-month pledge, or do a combination of both. Pledges finish on Monday, September 29.',
  },
  {
    q: 'Is my pledge tax-deductible?',
    a:
      'Tax deductibility is available for donation amounts of $5,000 and above. If you’d like detail on how that works for your gift, our finance team can walk you through it.',
  },
  {
    q: 'Can I give from outside Australia?',
    a:
      'Yes — international giving is possible. Get in touch with our finance team and we’ll send the right account details and any currency information for your country. [ Confirm specifics with finance. ]',
  },
  {
    q: 'What if my circumstances change?',
    a:
      'A pledge is an act of faith, not a contract. If anything shifts between now and the end of September, have a conversation with our finance team — they’ll walk through your options with you.',
  },
  {
    q: 'Who can I talk to?',
    a:
      'Our finance team is happy to walk you through any of it. Call (08) 8336 0000 or email finance@futures.church.',
  },
];

function FAQs() {
  return (
    <Section id="faqs" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Frequently Asked
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        The <span className="text-[var(--color-gold-800)]">Questions</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <dl className="mt-12 md:mt-16 max-w-[68ch] divide-y divide-[var(--color-ink-900)]/15">
        {FAQS.map((f, i) => (
          <FAQItem key={i} faq={f} />
        ))}
      </dl>
    </Section>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="py-7 md:py-8">
      <dt
        className="font-[family-name:var(--font-display)] uppercase tracking-[-0.005em] leading-[1.05]"
        style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)' }}
      >
        {faq.q}
      </dt>
      <dd className="mt-3 md:mt-4 text-base md:text-lg leading-[1.6] text-[var(--color-ink-900)]/80 max-w-[58ch]">
        {faq.a}
      </dd>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Footer — section #10 of the brief.
   Page-end. Brand mark, on-page anchors, contact channel, copyright.

   PLACEHOLDERS — phone, address, real BTF contact email.
---------------------------------------------------------------------------- */
function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[var(--color-ink-900)] text-[var(--color-cream-50)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand mark column */}
          <div className="md:col-span-5">
            <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.18em] text-lg md:text-xl">
              Building{' '}
              <span className="text-[var(--color-gold-500)]">The</span> Future
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs text-[var(--color-cream-50)]/60">
              Futures Church · 2026 Vision
            </p>
            <p className="mt-7 max-w-md text-base leading-[1.55] text-[var(--color-cream-50)]/75">
              The vision for the next chapter of Futures Church &mdash; five
              pillars, one future, and the offering that builds it.
            </p>
          </div>

          {/* On-page links */}
          <div className="md:col-span-3">
            <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs text-[var(--color-cream-50)]/55 mb-5">
              On this page
            </p>
            <ul className="space-y-2 text-[var(--color-cream-50)]/85">
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#building-2026">Building 2026</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#updates">What God&rsquo;s Doing</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#campuses">New Campuses</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#wellness">Wellness Centre</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#how-to-be-part">Be Part</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#ways-to-give">Ways to Give</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#stories">Stories of Faith</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-4">
            <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs text-[var(--color-cream-50)]/55 mb-5">
              Get in touch
            </p>
            <p className="leading-[1.55]">
              <a
                href="mailto:finance@futures.church"
                className="hover:text-[var(--color-gold-500)] transition-colors"
              >
                finance@futures.church
              </a>
            </p>
            <p className="mt-2 leading-[1.55] text-[var(--color-cream-50)]/75">
              <a
                href="tel:+61883600000"
                className="hover:text-[var(--color-gold-500)] transition-colors"
              >
                8336 0000
              </a>
            </p>
            <p className="mt-2 leading-[1.55] text-[var(--color-cream-50)]/55">
              57 Darley Road, Paradise SA 5075
            </p>
          </div>
        </div>

        <YellowStrip className="mt-16 md:mt-20 w-full" />

        <div className="mt-7 md:mt-8 flex flex-wrap justify-between items-center gap-3 text-[10px] md:text-xs font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[var(--color-cream-50)]/55">
          <span>© Futures Church · {new Date().getFullYear()}</span>
          <span>Pray · Prepare · Pledge · Commit</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
   NEW SECTIONS — restructure 2026-05-05
   ============================================================================ */

/* ----------------------------------------------------------------------------
   Section 2 — Building the Future 2026
   Heading + intro text. Sits directly under the hero. Pure typography, no
   media; the hero already carries the visual moment.
   PLACEHOLDER COPY — replace with real intro copy when content lands.
---------------------------------------------------------------------------- */
function BuildingTheFuture2026() {
  return (
    <Section id="building-2026" tone="cream">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Futures Church · 2026 Vision
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Building The{' '}
        <span className="text-[var(--color-gold-800)]">Future</span> 2026.
      </h2>

      <YellowStrip className="mt-6 md:mt-8 w-full max-w-[520px]" />

      <div className="mt-10 md:mt-12 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.7] text-[var(--color-ink-900)]/85 space-y-5">
        <p>
          <em
            className="italic font-normal"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Something is happening.
          </em>
        </p>
        <p>
          Across South Australia, Indonesia, the United States and Brazil,
          churches are being planted, leaders are being raised, and people are
          finding Jesus for the first time. What God is doing through Futures
          Church is nothing short of extraordinary, and we are only just
          getting started.
        </p>
        <p>
          <em
            className="italic font-normal"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Building the Future
          </em>{' '}
          is our annual moment to pause, celebrate what God has done, and say
          a united yes to what He is still building. It&rsquo;s not just a
          campaign, it&rsquo;s a conviction&hellip; that what we do together
          today becomes someone else&rsquo;s miracle tomorrow. That the seed
          we sow now grows into a harvest we may never fully see, in cities we
          may never visit, for people we haven&rsquo;t yet met.
        </p>
        <p>
          We believe the Church is God&rsquo;s greatest idea. And we believe
          He has called us, together, to partner with Jesus and build it well.
          Not for ourselves, but for the next generation. Not just locally,
          but globally. Not just for today, but for a future that belongs to
          Him.
        </p>
        <p>This is what Building the Future is all about.</p>
        <p>
          Explore the stories. Watch what God has done. And if this is your
          home, we&rsquo;d love you to be part of what comes next.
        </p>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Section 3 — What God's Been Doing
   Two videos side-by-side: the local/staff video and the Ps Ash & Jane vision
   video. Dark moment to break the cream rhythm + put the videos in their best
   visual environment.
---------------------------------------------------------------------------- */
function WhatGodsBeenDoing() {
  return (
    <Section id="updates" tone="ink">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/65 mb-6 md:mb-8">
        A Look Back · A Look Ahead
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.75rem)' }}
      >
        See What God&rsquo;s Been{' '}
        <span className="text-[var(--color-gold-500)]">Doing</span>.
      </h2>

      <YellowStrip className="mt-6 md:mt-8 w-full max-w-[520px]" />

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">
        {/* Local — staff video, what God has been doing locally */}
        <div>
          <VimeoEmbed
            id="1183634809"
            hash="9f487d7782"
            title="Local — what God has been doing through the Futures family"
            posterTitle="Local"
          />
          <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/55">
            Local · Staff · Futures Church
          </p>
        </div>

        {/* Global — Ps Ashley & Jane Evans vision */}
        <div>
          <VimeoEmbed
            id="1188946482"
            hash="076da569fd"
            title="Global — Ps Ashley & Jane Evans"
            posterTitle="Global"
          />
          <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/55">
            Global · Ps Ashley &amp; Jane Evans
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Section 4 — New Campuses
   The four new plants in the 2026 cycle. Each gets a card with placeholder
   copy + photo. Venezuela rolls four campuses into one card.
---------------------------------------------------------------------------- */
type Campus = {
  slug: string;
  name: string;
  region: string;
  body: string;
};

const CAMPUSES: Campus[] = [
  {
    slug: 'indonesia-6',
    name: 'Indonesia · 6th Campus',
    region: 'South-east Asia',
    body:
      '[ Placeholder. Short copy describing the 6th Indonesia campus — where, when, who. ]',
  },
  {
    slug: 'east-coast-australia',
    name: 'East Coast Australia',
    region: 'Australia',
    body:
      '[ Placeholder. Short copy on the new East Coast Australia campus. ]',
  },
  {
    slug: 'chattanooga',
    name: 'Chattanooga, Tennessee',
    region: 'United States',
    body:
      '[ Placeholder. Short copy on the new Chattanooga campus. ]',
  },
  {
    slug: 'venezuela',
    name: 'Venezuela · 4 Campuses',
    region: 'South America',
    body:
      '[ Placeholder. Short copy summarising the four new Venezuela campuses. ]',
  },
];

function NewCampuses() {
  return (
    <Section id="campuses" tone="cream">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        2026 Plant Cycle
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        New <span className="text-[var(--color-gold-800)]">Campuses</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      {/* Sub-headline / thesis statement */}
      <h3
        className="mt-10 md:mt-14 font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[-0.01em] text-[var(--color-ink-900)] max-w-[18ch] m-0"
        style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)' }}
      >
        The Vision for{' '}
        <span className="text-[var(--color-gold-800)]">200</span> Continues.
      </h3>

      {/* Intro body */}
      <div className="mt-8 md:mt-10 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.7] text-[var(--color-ink-900)]/85 space-y-5">
        <p>
          We don&rsquo;t plant churches because it&rsquo;s a good idea. We
          plant churches because Jesus commanded it, the Spirit empowers it,
          and people&rsquo;s eternities depend on it.
        </p>
        <p>
          From Adelaide to Atlanta, Bali to Brazil &mdash; Futures Church has
          always been a church on the move. And we&rsquo;re not slowing down.
        </p>
        <p>
          By the end of 2027, we believe God is calling us to plant at least
          seven new campuses across the globe. New cities. New communities.
          New families finding a home.
        </p>
      </div>

      {/* Campus location cards */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
        {CAMPUSES.map((c) => (
          <CampusCard key={c.slug} campus={c} />
        ))}
      </div>

      {/* Closing body — bridge from cards into the stat poster */}
      <div className="mt-14 md:mt-20 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.7] text-[var(--color-ink-900)]/85">
        <p>
          Every campus is a yes to someone who hasn&rsquo;t found Jesus yet.
          Every city is a field waiting for seed. And every time we go, we go
          together &mdash; one church, one vision, one name lifted high.
        </p>
      </div>

      {/* Stat poster — three big stacked lines, numbers in gold */}
      <div
        className="mt-10 md:mt-14 font-[family-name:var(--font-display)] uppercase leading-[0.96] tracking-[-0.012em] text-[var(--color-ink-900)]"
        style={{ fontSize: 'clamp(2rem, 6.5vw, 5.5rem)' }}
      >
        <p className="m-0">
          <span className="text-[var(--color-gold-800)]">200</span> Campuses.
        </p>
        <p className="m-0">
          <span className="text-[var(--color-gold-800)]">10,000</span> Leaders.
        </p>
        <p className="m-0">
          <span className="text-[var(--color-gold-800)]">100,000</span> Souls.
        </p>
      </div>

      {/* Closing line — italic Fraunces, echoes the BTF 2026 intro */}
      <p className="mt-10 md:mt-14 max-w-[58ch]">
        <em
          className="italic font-normal leading-[1.4]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.25rem, 2.8vw, 1.875rem)',
          }}
        >
          This is what He&rsquo;s building. And we&rsquo;re just getting
          started.
        </em>
      </p>
    </Section>
  );
}

function CampusCard({ campus }: { campus: Campus }) {
  return (
    <article id={campus.slug} className="flex flex-col">
      {/* Photo placeholder — drop a JPEG into /media/campuses/<slug>.jpg
          and replace this tile with an <img> when assets land. */}
      <div className="aspect-[5/4] bg-[var(--color-ink-900)]/5 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-[var(--color-ink-900)]/40">
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs">
            Photo
          </span>
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs mt-2">
            — TBC —
          </span>
          <span className="mt-5 max-w-[24ch] text-[11px] md:text-xs leading-snug">
            <span className="font-mono">{campus.slug}</span>
          </span>
        </div>
        <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
      </div>

      <p className="mt-5 font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.32em] uppercase text-[var(--color-ink-900)]/45">
        {campus.region}
      </p>
      <h3
        className="mt-2 font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[-0.01em] m-0"
        style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.75rem)' }}
      >
        {campus.name}
      </h3>
      <p className="mt-3 text-base md:text-lg leading-[1.5] text-[var(--color-ink-900)]/80 max-w-[42ch]">
        {campus.body}
      </p>
    </article>
  );
}

/* ----------------------------------------------------------------------------
   Section 5 — 15 Years of Multiplication
   Three infographic placeholders: overall multiplication, church health,
   wellness centre impact. Each is a sized slot waiting for the real graphic.
---------------------------------------------------------------------------- */
type StatBlock = {
  slug: string;
  title: string;
  body: string;
};

const STAT_BLOCKS: StatBlock[] = [
  {
    slug: 'overall',
    title: 'Multiplication',
    body:
      '[ Placeholder. Top-line numbers on what 15 years of multiplication looks like — campuses, leaders, souls. ]',
  },
  {
    slug: 'church-health',
    title: 'Church Health',
    body:
      '[ Placeholder. Health markers — discipleship, attendance, generations engaged. ]',
  },
];

export function FifteenYears() {
  return (
    <Section id="multiplication" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        2011 → 2026
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        15 Years of{' '}
        <span className="text-[var(--color-gold-800)]">Multiplication</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.5] text-[var(--color-ink-900)]/85">
        Fifteen years ago, we were one church in one city. Today, we&rsquo;re
        one church across the world&hellip; and the best is still ahead.
      </p>

      <div className="mt-12 md:mt-20 grid grid-cols-1 gap-14 md:gap-24">
        {STAT_BLOCKS.map((b) => (
          <StatCard key={b.slug} stat={b} />
        ))}
      </div>
    </Section>
  );
}

function StatCard({ stat }: { stat: StatBlock }) {
  return (
    <article id={stat.slug} className="flex flex-col">
      {/* Big section-style title — stacked cards mean each one is its own
          moment, not a small grid item. */}
      <h3
        className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em] text-[var(--color-ink-900)] m-0"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        {stat.title}
      </h3>

      {/* Big landscape infographic placeholder — full container width, banner-
          like aspect so a real infographic SVG/PNG can show top-line numbers
          across the page. Replace this tile with an <img> when the real
          asset is ready. */}
      <div className="mt-8 md:mt-10 aspect-[16/9] md:aspect-[2/1] bg-[var(--color-cream-50)] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-[var(--color-ink-900)]/40">
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-xs md:text-sm">
            Infographic
          </span>
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-xs md:text-sm mt-2">
            — TBC —
          </span>
        </div>
        <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
      </div>

      <p className="mt-6 md:mt-8 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.55] text-[var(--color-ink-900)]/80">
        {stat.body}
      </p>
    </article>
  );
}

/* ----------------------------------------------------------------------------
   Section 6.5 — Futures Wellness Centre
   Story-led standalone section: four-year origin reflection + a kicker line
   that lands into an impact infographic placeholder. Slot for real numbers
   when the Wellness team has them.
---------------------------------------------------------------------------- */
function WellnessClinic() {
  return (
    <Section id="wellness" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        Built In Faith · Four Years On
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Futures{' '}
        <span className="text-[var(--color-gold-800)]">Wellness</span> Centre.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      {/* Body — origin story */}
      <div className="mt-10 md:mt-14 max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.7] text-[var(--color-ink-900)]/85 space-y-5">
        <p>
          Four years ago, we gave in faith for something we couldn&rsquo;t yet
          see. We believed that the church could be more than a Sunday
          gathering &mdash; that it could be a place of real healing for real
          people.
        </p>
        <p>
          So we started Futures Wellness Clinic, built to meet the emotional,
          relational, physical and mental needs of our community, with a
          special heart for those who are most vulnerable and least able to
          access the help they need.
        </p>
      </div>

      {/* Italic kicker — pivots into the impact infographic */}
      <p className="mt-10 md:mt-14 max-w-[58ch]">
        <em
          className="italic font-normal leading-[1.4]"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.25rem, 2.8vw, 1.875rem)',
          }}
        >
          Here&rsquo;s what God has done with that yes.
        </em>
      </p>

      {/* Big landscape infographic placeholder for the wellness impact stats.
          Replace with <img> when the wellness team has the real numbers. */}
      <div className="mt-8 md:mt-12 aspect-[16/9] md:aspect-[2/1] bg-[var(--color-cream-50)] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-[var(--color-ink-900)]/40">
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-xs md:text-sm">
            Wellness Impact Infographic
          </span>
          <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-xs md:text-sm mt-2">
            &mdash; TBC &mdash;
          </span>
        </div>
        <YellowStrip className="absolute left-0 right-0 bottom-0 max-w-none" />
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Section 7 — Stories of Faith
   Video moment near the bottom of the page. Up to two videos in the same
   shape as the "What God's Been Doing" pair. Currently shows posters only —
   wire real Vimeo IDs when stories are recorded.
---------------------------------------------------------------------------- */
type Story = {
  slug: string;
  posterTitle: string;
  caption: string;
};

const STORIES: Story[] = [
  {
    slug: 'story-1',
    posterTitle: 'Story 01',
    caption: 'Story 01 · TBC',
  },
  {
    slug: 'story-2',
    posterTitle: 'Story 02',
    caption: 'Story 02 · TBC',
  },
];

function StoriesOfFaith() {
  return (
    <Section id="stories" tone="ink">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/65 mb-6 md:mb-8">
        Voices of the Church
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.88] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.75rem, 9vw, 9rem)' }}
      >
        Stories of <span className="text-[var(--color-gold-500)]">Faith</span>.
      </h2>

      <YellowStrip className="mt-8 md:mt-10 w-full max-w-[760px]" />

      <p className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl leading-[1.45] text-[var(--color-cream-50)]/80">
        [ Placeholder lead — short framing for the testimony videos. ]
      </p>

      <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">
        {STORIES.map((s) => (
          <div key={s.slug}>
            <StoryPosterTbc title={s.posterTitle} />
            <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-cream-50)]/55">
              {s.caption}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Story video poster — visually identical to the click-to-play VimeoEmbed
 * fallback, but non-interactive because there's no real Vimeo ID yet.
 * Swap to <VimeoEmbed id={...} hash={...} ... /> when each story is recorded.
 */
function StoryPosterTbc({ title }: { title: string }) {
  return (
    <div className="relative w-full aspect-video bg-[var(--color-ink-900)] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, var(--color-rust-900) 0%, var(--color-ink-900) 60%, var(--color-ink-900) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(108deg, transparent 0 90px, rgba(250,246,239,0.05) 90px 92px)',
        }}
      />
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 md:gap-7 px-6 text-center">
        <p
          className="font-[family-name:var(--font-display)] uppercase text-white m-0"
          style={{
            fontSize: 'clamp(1.25rem, 3.2vw, 2.5rem)',
            letterSpacing: '0.12em',
            lineHeight: 1.05,
          }}
        >
          {title}
        </p>
        <div
          aria-hidden
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-gold-500)]/60 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 md:w-9 md:h-9 fill-[var(--color-ink-900)] translate-x-[2px]"
          >
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </div>
        <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.32em] text-[10px] md:text-xs text-white/55 m-0">
          Video — TBC
        </p>
      </div>
    </div>
  );
}

export default App;
