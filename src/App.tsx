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
 * Sections built (full skeleton in place — content placeholders marked TODO):
 *   #1  Hero  (full-bleed campaign poster)
 *   #2  Vision letter from senior pastors  (A&J video + companion letter)
 *   #3  Global Reach  (Futures Global College, Indonesia, Brazil, Venezuela)
 *   #4  Why Now  (placeholder copy + pull quote)
 *   #5  The Five Pillars
 *   #6  Voices  (Ps Renee Watego, Ps Seth Behn, Ps Josh Greenwood + staff video)
 *   #7a Action ladder — Pray · Prepare · Pledge · Commit
 *   #7b Ways to Give
 *   #8  FAQs (6 placeholder Q&As)
 *   #9  Footer
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
        <VisionLetter />
        <GlobalReach />
        <WhyNow />
        <Pillars />
        <Voices />
        <ActionLadder />
        <WaysToGive />
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
 * Vimeo embed — responsive 16:9 iframe with a sensible default param set
 * (no title, no byline, no author portrait, do-not-track on).
 */
function VimeoEmbed({
  id,
  hash,
  title,
  className = '',
}: {
  id: string;
  hash: string;
  title: string;
  className?: string;
}) {
  const params = new URLSearchParams({
    h: hash,
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
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
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-28">
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
          Building <span className="text-[var(--color-gold-800)]">The</span> Future
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
    <section className="relative md:min-h-screen overflow-hidden bg-[var(--color-cream-50)] md:bg-[var(--color-ink-900)] text-white">
      {/* Visually-hidden semantic page heading — the actual title lives baked
          into the hero image, but screen readers + SEO need a real <h1>. */}
      <h1 className="sr-only">
        Building The Future — Futures Church 2026 Vision
      </h1>

      {/* Hero photograph.
          Mobile: in-flow block at natural aspect (full headline visible).
          Desktop: absolutely-positioned, object-cover full-bleed. */}
      <img
        src="/media/hero/btf-hero-1800.jpg"
        srcSet="/media/hero/btf-hero-1200.jpg 1200w, /media/hero/btf-hero-1800.jpg 1800w, /media/hero/btf-hero-2400.jpg 2400w"
        sizes="100vw"
        alt="Sunset over the city skyline. The words 'Building the Future' rise with the sun, sun-rays cresting from the horizon."
        width={2400}
        height={1167}
        loading="eager"
        fetchPriority="high"
        className="block w-full h-auto select-none mt-[64px] md:mt-0 md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
      />

      {/* Dark gradient at the bottom of the photo — only meaningful on desktop
          where text overlays the image. On mobile, content sits in plain dark
          space below the image and doesn't need it. */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 via-black/30 to-transparent z-[1]"
      />

      <div className="relative z-10 bg-[var(--color-ink-900)] md:bg-transparent md:min-h-screen md:flex md:flex-col">
        {/* Desktop only: pushes content to the bottom of the frame */}
        <div className="hidden md:block flex-1" />

        <div className="px-6 md:px-10 pt-6 pb-8 md:pt-0 md:pb-16">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* CTAs — subtitle removed (hero image already says it).
                Secondary "Watch the vision" hidden on mobile because the nav
                already exposes it; keeping both there made the dark area
                wrap and bloat. */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="#pillars"
                className="font-[family-name:var(--font-display)] inline-flex items-center gap-2 bg-[var(--color-gold-500)] text-[var(--color-ink-900)] px-6 py-3 md:px-7 md:py-4 text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors"
              >
                See the five pillars <span aria-hidden>→</span>
              </a>
              <a
                href="#vision"
                className="hidden md:inline-flex font-[family-name:var(--font-display)] items-center gap-2 px-5 py-4 text-xs md:text-sm tracking-[0.2em] uppercase text-white/85 hover:text-white transition-colors"
              >
                Watch the vision
              </a>
            </div>

            {/* action ladder ribbon */}
            <div className="mt-6 md:mt-14 flex items-center gap-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/65 font-[family-name:var(--font-display)]">
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
   Video-led: A&J's vision message anchors the section. The written letter
   sits below as a companion / transcript-feel block.

   PLACEHOLDERS — all clearly marked TODO:
     - Pastor names (currently "[ Ashley & Jane ]" — confirm with Shannon)
     - Letter copy below the video is a 4-paragraph stand-in
---------------------------------------------------------------------------- */
function VisionLetter() {
  return (
    <Section id="vision" tone="cream-100">
      <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/65 mb-6 md:mb-8">
        A Letter From Your Pastors
      </p>

      <h2
        className="font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.75rem)' }}
      >
        What We&rsquo;re{' '}
        <span className="text-[var(--color-gold-800)]">Building</span> Next.
      </h2>

      <YellowStrip className="mt-6 md:mt-8 w-full max-w-[520px]" />

      {/* The vision video — anchors the section */}
      <div className="mt-12 md:mt-16">
        <VimeoEmbed
          id="1188946482"
          hash="076da569fd"
          title="A letter from Pastors Ashley & Jane Evans"
        />
        <p className="mt-3 font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/55">
          Pastors Ashley &amp; Jane Evans · Senior Pastors
        </p>
      </div>

      {/* Companion letter — TODO: replace with the real letter copy */}
      <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-9 xl:col-span-8">
          <p className="font-[family-name:var(--font-display)] text-[10px] md:text-xs tracking-[0.32em] uppercase text-[var(--color-ink-900)]/55 mb-6">
            In their words
          </p>

          <div className="max-w-[58ch] text-base md:text-lg lg:text-xl leading-[1.65] text-[var(--color-ink-900)]/85 space-y-5">
            <p>Dear church family,</p>
            <p>
              Over the last decade you&rsquo;ve watched God do extraordinary
              things in this place. Lives changed. Generations reached. A
              community of faith becoming a community of life. None of it has
              been our doing.
            </p>
            <p>
              Today we want to tell you what we believe God is asking us to
              build next.
            </p>
            <p>
              <span className="font-[family-name:var(--font-display)] uppercase tracking-[0.05em]">
                Building The Future
              </span>{' '}
              is the vision for the season ahead — five pillars the next chapter
              of Futures Church will be measured by. Souls coming home.
              Disciples being made. Generations growing up in faith. Churches
              being planted. A reach that&rsquo;s both global and local.
            </p>
            <p>
              This is bigger than any one of us. Which is exactly why
              we&rsquo;re asking each of us to be part of it.
            </p>
          </div>

          {/* signature */}
          <div className="mt-10 font-[family-name:var(--font-display)] uppercase">
            <p className="text-base md:text-lg tracking-[0.18em]">
              [ Ashley &amp; Jane Evans ]
            </p>
            <p className="text-[10px] md:text-xs tracking-[0.32em] text-[var(--color-ink-900)]/60 mt-1.5">
              Senior Pastors · Futures Church
            </p>
          </div>

          {/* CTA */}
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
        Five <span className="text-[var(--color-gold-800)]">Pillars</span>.
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
      <p className="mt-7 md:mt-9 text-lg md:text-xl lg:text-2xl leading-[1.5] text-[var(--color-ink-900)]/85 max-w-[58ch]">
        {pillar.body}
      </p>

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
      'Shares, property, business gifts — there are many ways to give. Speak with the BTF team and we’ll walk you through it.',
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
        Ways to <span className="text-[var(--color-gold-800)]">Give</span>.
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
      <p className="text-base md:text-lg leading-[1.55] text-[var(--color-ink-900)]/80 max-w-[44ch] flex-1">
        {method.body}
      </p>
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

function GlobalReach() {
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
function WhyNow() {
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

      <div className="mt-10 md:mt-14 max-w-[58ch] text-lg md:text-xl lg:text-2xl leading-[1.6] text-[var(--color-cream-50)]/85 space-y-6">
        <p>
          Some seasons are for tending what you&rsquo;ve built. This one is for
          building what comes next.
        </p>
        <p>
          The church has grown. The team is in place. The need on the other
          side of our walls keeps growing too. We can stay where we are and
          stay safe &mdash; or we can step out, build bigger, and trust God
          for what only he can do.
        </p>
        <p>
          We believe the next five years are decisive. We don&rsquo;t want to
          look back at this season and wonder what could have been.
        </p>
      </div>

      {/* pull quote */}
      <p
        className="mt-16 md:mt-24 max-w-[18ch] font-[family-name:var(--font-display)] uppercase leading-[0.92] tracking-[-0.012em] text-[var(--color-gold-500)]"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.5rem)' }}
      >
        &ldquo;What we build now will outlast us.&rdquo;
      </p>
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

function Voices() {
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
    a: '[ Placeholder. Confirm campaign launch + key milestone dates with the BTF team. ]',
  },
  {
    q: 'How is the money used?',
    a: '[ Placeholder. Describe how funds are stewarded across the five pillars and which projects they fund first. ]',
  },
  {
    q: 'Is my pledge tax-deductible?',
    a: '[ Placeholder. Confirm with the finance team — gift category, receipts, and what counts. ]',
  },
  {
    q: 'Can I give from outside Australia?',
    a: '[ Placeholder. Describe international giving channels. ]',
  },
  {
    q: 'What if my circumstances change?',
    a: '[ Placeholder. Reassure that pledges are flexible and explain how to update or pause. ]',
  },
  {
    q: 'Who can I talk to?',
    a: '[ Placeholder. Point to the BTF contact channel — email, phone, drop-in. ]',
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
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#vision">A Letter</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#global-reach">Global Reach</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#why-now">Why Now</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#pillars">Five Pillars</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#voices">Voices</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#how-to-be-part">Be Part</a></li>
              <li><a className="hover:text-[var(--color-gold-500)] transition-colors" href="#ways-to-give">Ways to Give</a></li>
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
                href="mailto:btf@futures.church"
                className="hover:text-[var(--color-gold-500)] transition-colors"
              >
                btf@futures.church
              </a>
            </p>
            <p className="mt-2 leading-[1.55] text-[var(--color-cream-50)]/75">
              [ Phone TBC ]
            </p>
            <p className="mt-2 leading-[1.55] text-[var(--color-cream-50)]/55">
              [ Address TBC ]
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

export default App;
