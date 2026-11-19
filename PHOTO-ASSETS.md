# THEBUMBS — approved photo assets
The source images were supplied by the website owners. Only approved photos should be used. Do not use rejected image 1000139135.jpg.

## Nine-image scroll tunnel
Upload the contents of the approved `thebumbs-nine-scroll-photos.zip` into the repository, preserving paths:

1. `public/images/scroll/01-matei-larisa-portrait.jpg`
2. `public/images/scroll/02-matei-speaking-approved.jpg` — approved brown-shirt speaking photo, sourced from 1000139137.jpg
3. `public/images/scroll/03-larisa-speaking.jpg`
4. `public/images/scroll/04-matei-larisa-outreach.jpg`
5. `public/images/scroll/05-street-evangelism.jpg`
6. `public/images/scroll/06-prayer-ministry.jpg`
7. `public/images/scroll/07-worship-and-prayer.jpg`
8. `public/images/scroll/08-outreach-team-outdoors.jpg`
9. `public/images/scroll/09-matei-preaching-black-white.jpg`

The `PhotoTunnel` component reads these exact paths. Missing assets are intentionally hidden until loaded.

## Remaining photo library
The separate approved 19-image collection belongs in `public/images/`, retaining its original approved filenames. Check permissions for identifiable third parties before public deployment.

## Publishing gate
Do not merge or deploy until binary images have been committed, `npm run build` succeeds, and the scrolling sequence is checked on desktop and mobile (including reduced motion).
