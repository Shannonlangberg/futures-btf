# Media

Static photo + video assets for the site. Anything dropped in here is served
as-is at `/media/...` — e.g. `public/media/hero/aerial-1.jpg` is reachable at
`https://your-site/media/hero/aerial-1.jpg`.

## Where things go

- `hero/` — full-bleed hero shots / video for the homepage section #1.
- `projects/anchor/` — renders, plans, photos for the flagship anchor project.
- `projects/<name>/` — each portfolio project gets its own folder, kebab-case
  (e.g. `projects/north-foyer/`).
- `portraits/` — people shots (senior pastor for the vision letter, leaders for
  voices, etc.). Square or portrait crops.
- `general/` — anything that doesn't fit above (textures, mood images, social
  share images).

## File naming

Use lowercase + hyphens. Numbered when it's a sequence.

✅ `aerial-from-east-1.jpg`
✅ `north-foyer-render-2.jpg`
❌ `IMG_0421.jpeg`
❌ `Hero Render Final FINAL v3.png`

## Size guidelines

- **Photos:** export at 2400px on the long edge, JPEG quality 80, sRGB. Keep
  individual files under ~3 MB where possible.
- **Video:** H.264 MP4, 1080p, with a separate poster image (`poster.jpg`).
  Keep clips under ~15 MB for hero loops; use a longer-form video host
  (Vimeo / YouTube unlisted) for anything over a minute.
- **Hard limit:** 100 MB per file (GitHub will reject larger). Videos over
  ~25 MB are better hosted on Vimeo and embedded.

## Formats

- Photos: JPEG (preferred), PNG for things with transparency, WebP if you've
  got the tooling.
- Video: MP4 (H.264). Add an MP4 + poster JPG pair.
