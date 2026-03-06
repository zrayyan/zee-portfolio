# Futuristic Portfolio Website

A visually stunning and highly interactive personal portfolio website for a researcher and systems engineer, built with Next.js and deployed on Cloudflare Pages.

## Features

- **Futuristic Design**: Dark theme with animated backgrounds and immersive visuals
- **Interactive Research Visualization**: Network graph displaying research areas and connections
- **Animated Project Cards**: Hover effects with glow and tilt animations
- **Scroll-Based Storytelling**: Smooth transitions and parallax effects
- **Responsive Timeline**: Professional experience and milestones
- **Dark/Light Mode Toggle**: Seamless theme switching
- **Smooth Page Transitions**: Framer Motion powered animations
- **3D Elements**: React Three Fiber for subtle 3D visuals
- **Markdown Blog**: Writing section with static markdown content
- **SEO Optimized**: Meta tags, sitemap, and robots.txt generation
- **Accessibility**: WCAG 2.1 AA compliant with reduced motion support
- **Performance**: Optimized for fast loading and minimal bundle size

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: React Three Fiber, Three.js
- **Typography**: Inter font
- **Icons**: Lucide React
- **Theme**: next-themes
- **Content**: Gray Matter, Remark
- **Deployment**: Cloudflare Pages (static export)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── research/          # Research page
│   ├── projects/          # Projects page
│   ├── writing/           # Writing/blog page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Header navigation
│   ├── Hero.tsx          # Hero section with 3D background
│   ├── Cursor.tsx        # Custom cursor effects
│   └── ...
├── content/               # Markdown content
│   └── writing/          # Blog posts
├── lib/                   # Utility functions
│   └── posts.ts          # Blog post processing
└── ...
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Deployment to Cloudflare Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your GitHub repository
   - Set build settings:
     - Build command: `npm run build`
     - Build output directory: `out`
     - Root directory: `/` (leave empty)

3. **Environment Variables** (optional)
   - Set `SITE_URL` for sitemap generation

4. **Deploy**
   - Push to your repository's main branch
   - Cloudflare Pages will automatically build and deploy

## Customization

### Colors
Update color palette in `tailwind.config.ts`:
```typescript
colors: {
  dark: "#020617",      // Background
  primary: "#3B82F6",   // Accent
  secondary: "#22C55E", // Success
  highlight: "#A855F7", // Purple
}
```

### Content
- **Projects**: Edit `src/app/projects/page.tsx`
- **Research**: Update `src/app/research/page.tsx`
- **About**: Modify timeline in `src/app/about/page.tsx`
- **Writing**: Add markdown files to `src/content/writing/`

### Fonts
Currently using Inter. To change:
1. Update `src/app/layout.tsx`
2. Update `tailwind.config.ts`

## Performance Optimization

- Static generation for all pages
- Lazy loading of 3D components
- Optimized images (unoptimized for static export)
- Minimal bundle with tree shaking
- Reduced motion support

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- Reduced motion for users with vestibular disorders
- High contrast ratios

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- WebGL for 3D elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
