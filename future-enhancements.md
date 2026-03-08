🎯 Interaction & Visual Flair
✅ **Smooth page transitions**
− use a shared layout <AnimatePresence> + motion.div to fade/slide between routes. (implemented using PageTransition client component)

✅ **Hero‑section upgrades**
− particles, 3‑D objects with react-three-fiber, or a shader‑based gradient. (3D sphere already present)
− add subtle mouse‑move parallax to text and shapes. (implemented)

✅ **Project cards**
− tilt/3‑D “parallax” on hover (e.g. whileHover={{ rotateY: 10 }}). (done)
− animated “tech” tags that pop in staggered. (done)
− lazy‑loaded screenshots with entrance blur. (done)

✅ **Research graph**
− make nodes draggable or clickable to reveal a sidebar detail. (done)
− animate node connections on scroll (draw as user scrolls). (done)

✅ **Animated timeline**
− step‑through with a progress indicator or vertical line that grows as you scroll. (done)
− incorporate icons that “light up” when a year passes. (done)

Cursor & pointer effects
− custom cursor ripple or trail on hover, with reduced‑motion fallback.

✅ **Loading screen / splash**
− lightweight animated logo or progress bar while the page hydrates. (implemented loader overlay)

✅ **Theme & Accessibility**
Dark/light toggle with Tailwind’s class strategy and persist in localStorage. (already implemented)
Respect prefers-reduced-motion by disabling non‑essential animations. (cursor & loader respect, others use reduced-motion flag)
Ensure all interactive elements are keyboard‑focusable with visible outlines. (added focus rings throughout)
Add ARIA labels on custom components (project cards, graph nodes). (added)

⚙️ Performance & Deployment
Pre‑generate sitemap.xml at build time (Next has built‑in support). (configured)
Use next/image with priority on hero assets and loading="lazy" for the rest.
Audit with Lighthouse and fix any warnings (third‑party scripts, unused JS).
Consider splitting heavy animations with dynamic() or next/dynamic so they don’t bloat the initial bundle.
📈 Content & SEO
Add structured data (<script type="application/ld+json">) for projects and blog posts.
Meta tags for Open Graph/Twitter cards per page.
A “featured” carousel on the homepage pulling latest blog posts or projects.
Generate category/tag pages for writing, with generateStaticParams as you did for categories.

⚛️ Advanced Ideas
Scroll‑linked animations via framer-motion’s useScroll or GSAP’s ScrollTrigger.
3‑D scene on the research page as a fallback for the SVG graph.
Realtime search/filter on the projects or writing lists using client‑side state.