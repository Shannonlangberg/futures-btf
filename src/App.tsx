/**
 * App entry — placeholder hero so we can verify the stack end-to-end.
 *
 * This is intentionally minimal. The real layout (long-scroll homepage,
 * project detail routes, etc.) gets built section-by-section against
 * 00_SITE_BRIEF_v0.1.md once the stack is wired up.
 */
function App() {
  return (
    <main className="min-h-screen bg-[var(--color-ink-900)] text-[var(--color-cream-50)] flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-[var(--color-ember-500)] tracking-[0.2em] text-xs uppercase mb-6">
          Futures Church · 2026
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[1.05] tracking-tight"
        >
          We're <em className="text-[var(--color-ember-500)] not-italic font-normal italic">building</em> the future.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[var(--color-sage-300)] max-w-xl mx-auto">
          Stack is live. Brand tokens are wired. Site brief is the spec.
          Next step: section-by-section build against the homepage map.
        </p>
      </div>
    </main>
  );
}

export default App;
