# Flicks & Licks Website Plan

## Project summary
Build a lightweight, high-impact landing page for Flicks & Licks, a playful, casual, friendly, welcoming food brand located in Haatso Atomic.

The site should feel like a modern e-commerce storefront while staying simple, fast, and easy to maintain. It is a landing page first, not a full ecommerce checkout system. The goal is to showcase the brand, featured items, categories, ordering information, and location in a way that drives customers to order or visit.

The user will upload the logo, menu, and photos later, so the structure must support future content updates without redesigning the site.

## Business goals
- Make the brand look memorable and polished.
- Make products easy to browse.
- Highlight the location clearly.
- Encourage quick ordering.
- Keep the site lightweight.
- Support future expansion into a larger menu or store experience.

## Brand details
- Brand name: Flicks & Licks
- Location: Haatso Atomic
- Tone of voice: playful, casual, friendly, welcoming
- Payment method: cash only

## Technical stack
- Next.js
- TypeScript
- Tailwind CSS

## Site type
Single-page landing page with e-commerce-style sections.

## Design direction
Use the company’s brand palette: red, black, and white. The site should feel bold, appetizing, and high contrast, with a clean premium finish.

### Suggested palette direction
- Background: deep black or near-black
- Surface: dark charcoal
- Primary accent: brand red
- Secondary accent: white
- Text: white or off-white on dark sections
- Inverse text: black on white sections
- Borders: subtle red or neutral dark gray
- Hover states: deeper red or muted white highlight

## Content strategy
The user will supply:
- Logo
- Menu
- Photos

Until then, use placeholders and sample data that are easy to replace.

## Primary page sections

### 1. Header
Purpose: Provide identity and navigation.

Include:
- Logo area
- Navigation links to sections
- CTA button such as “Order Now”
- Mobile menu

### 2. Hero section
Purpose: Create strong first impression.

Include:
- Bold headline
- Short subheadline
- Primary CTA
- Secondary CTA
- Optional hero image or collage placeholder
- Trust line such as “Cash only • Freshly made • Fast pickup”

### 3. Featured items
Purpose: Show best-selling or featured products in an e-commerce-like grid.

Include:
- Product cards
- Product image
- Name
- Short description
- Price
- Badge such as “Best Seller”

### 4. Categories
Purpose: Help users browse products quickly.

Include:
- Category chips or cards
- Category labels
- Optional filter behavior
- Clean, mobile-friendly layout

### 5. How it works
Purpose: Explain ordering simply.

Include:
- Browse menu
- Choose item
- Pay cash on pickup
- Enjoy your order

### 6. Cash-only notice
Purpose: Avoid confusion.

Include:
- Clear callout
- Emphasis that payment is cash only
- Simple language

### 7. Location and hours
Purpose: Help customers visit easily.

Include:
- Haatso Atomic location
- Operating hours
- Contact details
- Map placeholder or embedded map block

### 8. Testimonials / social proof
Purpose: Build trust.

Include:
- Short customer reviews
- Star rating style display
- Social-friendly design

### 9. FAQ
Purpose: Answer common questions.

Include:
- Is it cash only?
- Where are you located?
- Do you accept pre-orders?
- Do you deliver?
- What are your hours?

### 10. Footer
Purpose: Close the page with useful links.

Include:
- Brand summary
- Contact details
- Social links
- Quick anchor links
- SEO-friendly business text

## UX requirements
- Mobile-first layout.
- Fast-loading page.
- Strong CTA placement.
- Smooth anchor scrolling.
- Simple browsing experience.
- Clear visual hierarchy.
- Minimal clutter.
- E-commerce feel without heavy complexity.

## Visual requirements
- Large images with good crop handling.
- Rounded cards.
- Soft shadows.
- Clear spacing.
- Bold typography.
- Subtle transitions only.
- High contrast between background, red accents, and white text.

## Performance requirements
- Use optimized image handling.
- Keep media web-friendly.
- Avoid unnecessary dependencies.
- Keep animations light.
- Maintain a small bundle size.

## SEO requirements
Add:
- Title tag
- Meta description
- Open Graph metadata
- Twitter card metadata
- Canonical URL placeholder
- Local business language

### SEO keywords to include naturally
- Flicks & Licks
- Haatso Atomic
- local food brand
- cash only
- fresh food
- order now
- Ghana food

## Accessibility requirements
- Semantic HTML.
- Accessible buttons and links.
- Alt text placeholders for images.
- Good color contrast.
- Keyboard-friendly navigation.

## Data structure
Use local objects or JSON-like arrays for:
- categories
- products
- testimonials
- FAQ items
- hours
- contact details

## Reusable components
- Header
- Hero
- ProductCard
- CategoryChips
- HowItWorks
- CashNotice
- LocationHours
- Testimonials
- FAQAccordion
- Footer

## Future expansion
Design the site so it can later grow into:
- /menu
- /about
- /contact
- /faq
- Full ecommerce ordering flow

## Build priorities
1. Make the page feel premium and playful.
2. Keep the page lightweight.
3. Make the ordering path obvious.
4. Make the location and cash-only details clear.
5. Ensure the structure supports future menu/image uploads.

## Acceptance criteria
- The landing page looks polished and modern.
- The site feels playful and welcoming.
- The product section feels like a real storefront.
- The page works well on mobile.
- SEO metadata is present.
- The code is clean and maintainable.
- The user can replace sample content later without redesigning the page.
## Important side notes
- With the menu, I will add an image or two with the menu in it. I need you to disect the content in the menu and give each its card, use images from online if necessary, make sure the image is relevant and high-res
- All images should be loaded to .webp to make it light weight and load fast

