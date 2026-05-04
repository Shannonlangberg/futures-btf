# Building The Future — futures-btf

Vision-casting site for Futures Church's *Building The Future* initiative.

**Stack:** Vite · React 19 · TypeScript · Tailwind v4 · Supabase · Netlify

The full product spec lives in [`../00_SITE_BRIEF_v0.1.md`](../00_SITE_BRIEF_v0.1.md). Read that first.

---

## Local development

```bash
npm install
npm run dev      # vite dev server on http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

You'll need Node 22+ (matched by `netlify.toml`).

Copy `.env.example` to `.env` and fill in your Supabase keys — see step 4 below for where to find them.

---

## One-time cloud setup

The local project is ready. The steps below wire it up to GitHub, Netlify, and Supabase. Do them in order.

### 0. Initialise git locally

The project folder doesn't have a fresh `.git` yet (it was scaffolded outside git). From inside `futures-btf/` on your machine:

```bash
# If a half-initialised .git already exists from earlier scaffolding, nuke it first:
rm -rf .git

git init -b main
git add .
git commit -m "Initial commit: Vite + React + TS + Tailwind + Supabase + Netlify scaffold"
```

### 1. Create the GitHub repo

1. Go to <https://github.com/new>.
2. **Owner:** the Futures org (or your account if you'll transfer later).
3. **Repository name:** `futures-btf`
4. **Visibility:** Private (probably — change later if you want it public).
5. Leave *"Initialize this repository with"* options **unchecked** — we already have a README, .gitignore, and a first commit locally.
6. Click **Create repository**. GitHub will show you a "push existing repository" snippet.

### 2. Push the local repo

From the `futures-btf/` folder, run the snippet GitHub showed you. It'll look like:

```bash
git remote add origin git@github.com:<your-org>/futures-btf.git
git branch -M main
git push -u origin main
```

(Use the SSH URL if you have SSH keys set up, otherwise the HTTPS URL.)

### 3. Connect Netlify to the repo

1. Go to <https://app.netlify.com/start>.
2. Choose **Import from Git** → **GitHub** → authorise Netlify if prompted.
3. Pick `futures-btf` from the repo list.
4. Netlify should auto-detect the Vite settings from `netlify.toml`. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Branch to deploy:** `main`
5. Click **Deploy**. The first build will succeed even without Supabase keys — the client logs a warning but the placeholder hero still renders.
6. (Optional, do later) **Site settings → Domain management** → add the production domain (e.g. `building.futures.church`).

### 4. Create the Supabase project

1. Go to <https://supabase.com/dashboard/projects> and click **New project**.
2. **Organisation:** Futures.
3. **Project name:** `futures-btf`
4. **Database password:** generate a strong one and save it to your password manager — you won't need it for the website code (that uses the anon key), but you'll need it if you ever connect directly to Postgres.
5. **Region:** pick the one closest to your audience (Sydney for AU, etc.).
6. Wait ~2 min for the project to provision.
7. Once it's up, go to **Project settings → API**. You'll need two values:
   - **Project URL** → this is your `VITE_SUPABASE_URL`
   - **`anon` `public` key** → this is your `VITE_SUPABASE_ANON_KEY`
   - ⚠️ **NEVER use the `service_role` key in this project** — that one bypasses Row-Level Security and must stay server-side only.

### 5. Wire the Supabase keys into Netlify and your local `.env`

**Netlify** (production):

1. Netlify dashboard → your site → **Site configuration → Environment variables**.
2. Add `VITE_SUPABASE_URL` with the Project URL from step 4.
3. Add `VITE_SUPABASE_ANON_KEY` with the anon key from step 4.
4. Trigger a redeploy (**Deploys → Trigger deploy → Clear cache and deploy site**).

**Local** (development):

```bash
cp .env.example .env
# then edit .env and paste in the same two values
```

Restart `npm run dev` for Vite to pick up the new env vars.

---

## What's next

Once the stack is wired up, we move from setup → build. The next milestone is the **homepage hero** — implementing section #1 from the site brief as a real, brand-correct component. After that we work top-down through the homepage section map (§6 of the brief), then the project detail page template.

---

## Project layout (so far)

```
futures-btf/
├── public/             # static assets (favicons, og images later)
├── src/
│   ├── lib/
│   │   └── supabase.ts # Supabase client (reads from env)
│   ├── App.tsx         # placeholder hero — gets replaced by real layout
│   ├── main.tsx        # React entry
│   └── index.css       # Tailwind import + brand design tokens
├── .env.example        # template — copy to .env, never commit .env
├── netlify.toml        # Netlify build + redirect config
├── vite.config.ts      # Vite + Tailwind plugin
└── package.json
```
