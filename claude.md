# Flicks & Licks Website

## Project overview
Build a lightweight, high-impact landing page for Flicks & Licks, a playful, casual, friendly, welcoming food brand located in Haatso Atomic.

The website should feel like a modern e-commerce storefront, but it is not a full online checkout app. It should showcase food products, categories, featured items, brand story, location, and ordering details in a visually strong, conversion-focused layout.

The user will upload the logo, menu, and photos later. Build the site so those assets can be dropped in without redesigning the structure.

## Goals
- Make the brand look premium, memorable, and fun.
- Keep the site fast and lightweight.
- Use a landing page format with strong e-commerce-inspired sections.
- Support cash-only ordering.
- Make the design easy to scale later into a larger site.
- Prioritize mobile performance and visual impact.

## Brand direction
- Brand name: Flicks & Licks
- Location: Haatso Atomic
- Tone: playful, casual, friendly, welcoming
- Design style: bold, warm, modern, high-contrast
- UI feel: energetic food brand with polished product presentation

## Tech stack
- Next.js
- TypeScript
- Tailwind CSS

## Constraints
- Keep it lightweight.
- Optimize images for web use.
- Use responsive layouts.
- Use accessible components and semantic HTML.
- Use SEO metadata on every page/section.
- Do not build a heavy backend.
- Do not assume card payments.
- Cash only ordering.

## Information architecture
Single-page landing page with section anchors.

### Sections
1. Header
2. Hero
3. Featured items
4. Categories
5. How it works
6. Cash-only notice
7. Location and hours
8. Testimonials
9. FAQ
10. Footer

## UX requirements
- Mobile-first design.
- Sticky header on scroll.
- Clear CTA buttons.
- E-commerce-style product cards.
- Category filter chips.
- Smooth scroll to sections.
- Responsive grid layouts.
- Subtle animations only.
- Fast load time.

## Visual direction
Use the brand palette: red, black, and white. Build a clean and striking palette that feels bold and food-forward.

### Suggested palette
- Background: black or deep charcoal
- Surface: dark warm gray
- Primary accent: brand red
- Secondary accent: white
- Text: white on dark sections, black on white sections
- Muted text: light gray on dark sections
- Borders: subtle dark gray or red

## Layout rules
- Keep the hero bold and simple.
- Use large spacing and strong typography.
- Use cards for products.
- Avoid clutter.
- Make each section visually distinct without overdesigning.
- Use consistent rounding and shadow styles.

## Typography
Use a modern sans-serif font pair, such as:
- Heading: bold geometric sans
- Body: clean readable sans

If using Google Fonts, choose something that feels modern and approachable.

## Pages
This can start as a single landing page only.
Later, it can expand to:
- /menu
- /about
- /contact
- /faq

## Components
Build reusable components for:
- Header
- Hero section
- CTA buttons
- Product cards
- Category chips
- Feature badges
- Order steps
- Location block
- Testimonial cards
- FAQ accordion
- Footer

## Data structure
Use local data arrays or JSON-like objects for:
- categories
- products
- testimonials
- faq items
- hours
- contact info

## Sample product card fields
- name
- category
- description
- price
- image
- badge
- isFeatured

## SEO requirements
Add:
- title tag
- meta description
- Open Graph tags
- Twitter card tags
- canonical URL placeholder
- structured data where useful
- local business SEO language

## SEO content guidance
Mention:
- Flicks & Licks
- Haatso Atomic
- fresh food
- cash only
- pickup or dine-in if applicable
- easy ordering
- local food brand in Ghana

## Accessibility requirements
- Use semantic landmarks.
- Ensure color contrast.
- Add alt text placeholders for all images.
- Make buttons keyboard accessible.
- Support screen readers.

## Performance requirements
- Use next/image where appropriate.
- Avoid large unoptimized images.
- Lazy load non-critical media.
- Minimize custom scripts.
- Keep animations light.

## Homepage copy direction
Write in a playful, casual, friendly, welcoming voice.
Examples of copy tone:
- “Big flavor. Bold vibes.”
- “Fresh picks, made to satisfy.”
- “Cash only, fast pickup, easy cravings.”
Avoid corporate language.

## Placeholder content strategy
- Logo: user will upload.
- Menu: user will upload.
- Photos: user will upload.
- Until then, use clean placeholders and sample data.
- Structure should remain stable when real assets are inserted.

## Suggested homepage content
### Hero
Headline: bold and crave-driven.
Subheadline: short and friendly.
CTA 1: Order Now
CTA 2: View Menu

### Featured items
Show 3 to 6 products.

### Categories
Show menu categories as chips or cards.

### Order flow
Use a simple 4-step explanation.

### Location
Show Haatso Atomic clearly with map placeholder.

### FAQ
Answer the most common ordering questions.

## Deliverables Claude should generate
- Complete landing page code
- Component structure
- Tailwind styling
- TypeScript types
- SEO metadata
- Responsive behavior
- Placeholder data file
- Clean folder structure
- Minimal but polished animations

## Folder structure suggestion
- app/
  - page.tsx
  - layout.tsx
  - globals.css
- components/
  - Header.tsx
  - Hero.tsx
  - FeaturedItems.tsx
  - Categories.tsx
  - HowItWorks.tsx
  - LocationHours.tsx
  - Testimonials.tsx
  - FAQ.tsx
  - Footer.tsx
- data/
  - site.ts
- types/
  - index.ts

## Coding instructions
- Write clean, readable, production-ready code.
- Use functional components.
- Prefer composition over duplication.
- Keep styling in Tailwind.
- Do not add unnecessary dependencies.
- Make the page fast and easy to maintain.
- Prepare the structure so the user can later replace sample content with real menu items and photos.

## Acceptance criteria
- Landing page looks premium and playful.
- Mobile experience is excellent.
- Products are easy to browse.
- Ordering path is obvious.
- SEO metadata is included.
- Code is lightweight and organized.
- Visual design matches the red, black, and white brand palette.
