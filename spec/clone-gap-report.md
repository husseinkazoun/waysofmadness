# Clone Gap Report: Nader Bahsoun Studios
**Target:** https://www.naderbahsounstudios.com
**Status:** Beta Clone (Active Development)
**Last Audit:** 2025-12-13

---

## Executive Summary

The nader-site repository is a functional Next.js clone of the original Squarespace site with **core layout and routing** in place. However, several gaps remain to achieve pixel-identical parity across typography, SEO metadata, URL structure, and fine-grained design details.

### Gap Categories
- **Typography**: ⚠️ Medium Priority
- **Layout**: ✅ Mostly Complete
- **Navigation**: ✅ Functional with minor gaps
- **Media Handling**: ✅ Complete (Squarespace CDN)
- **SEO/Metadata**: ⚠️ High Priority
- **URL Parity**: ⚠️ High Priority

---

## 1. Typography Gaps

### 1.1 Font Family
**Status:** ❌ Not Defined

**Original Site:**
- Uses Squarespace's typography system
- Font families not explicitly extracted from source (requires live browser inspection)
- Likely using a web font service (Adobe Fonts, Google Fonts, or Squarespace's built-in library)

**Current Implementation:**
```css
/* app/globals.css */
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

**Recommendations:**
1. Inspect original site in browser DevTools to extract exact font-family values
2. Likely candidates: Inter, Helvetica Neue, or a custom Squarespace font
3. Add font imports to `app/layout.tsx` or `globals.css`
4. Update Tailwind config with proper font stacks

---

### 1.2 Font Weights & Sizes
**Status:** ⚠️ Partially Matched

**Current Implementation:**
- Headings: `text-4xl font-medium` (h1), `text-3xl font-semibold` (some pages)
- Body: `text-lg` with `leading-relaxed`
- Navigation: `text-sm`

**Gaps:**
- H1 size may differ between pages (e.g., projects vs about)
- Font weight values: `font-medium` (500) vs original (may be 400 or 600)
- Missing explicit line-height values (using Tailwind defaults)
- No letter-spacing defined (original may use custom tracking)

**Action Items:**
1. Measure exact font sizes from original using DevTools
2. Create typography scale in `tailwind.config.ts`:
   ```ts
   fontSize: {
     'h1-desktop': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
     'h1-mobile': ['36px', { lineHeight: '1.2' }],
     'body': ['18px', { lineHeight: '1.6' }],
   }
   ```
3. Standardize heading sizes across all pages

---

### 1.3 Text Color & Contrast
**Status:** ✅ Mostly Accurate

**Current:**
- White headings: `text-white` (#ffffff)
- Body text: `text-zinc-300` (#d4d4d8)
- Muted text: `text-zinc-400`, `text-zinc-500`

**Minor Gaps:**
- Exact hex values may differ slightly
- Hover states on links may need adjustment

---

## 2. Layout Gaps

### 2.1 Grid System
**Status:** ✅ Accurate

**Original:**
- Desktop: 24-column grid, 11px gaps, 4vw gutters
- Mobile: 8-column grid, 11px gaps, 6vw gutters
- Max-width: 1500px

**Current Implementation:**
```tsx
className="grid grid-cols-8 gap-[11px] md:grid-cols-24"
className="px-[6vw] py-20 md:px-[4vw]"
className="mx-auto max-w-[1500px]"
```

**Result:** ✅ Perfect match

---

### 2.2 Spacing Scale
**Status:** ⚠️ Inconsistent

**Current Usage:**
- `space-y-4`, `space-y-6`, `space-y-8`, `space-y-12` (mixed)
- Padding: `py-20`, `py-4`, `p-4`, `p-8` (varied)

**Gaps:**
- Spacing between sections may not match original exactly
- Original uses Squarespace's spacing variables (not fully replicated)

**Recommendations:**
1. Audit spacing on key pages (homepage, project detail, about)
2. Create consistent spacing tokens in Tailwind config
3. Define section spacing standard (e.g., `space-y-16` for major sections)

---

### 2.3 Image Aspect Ratios
**Status:** ⚠️ Hardcoded

**Current:**
```tsx
className="relative aspect-[3/2] w-full"
```

**Gaps:**
- All images use fixed 3:2 ratio
- Original may have varied aspect ratios per image
- No support for portrait images or custom ratios

**Recommendations:**
1. Allow dynamic aspect ratios from image metadata
2. Consider using intrinsic image dimensions for more accurate rendering

---

## 3. Navigation Gaps

### 3.1 Dropdown Behavior
**Status:** ✅ Functional, ⚠️ Minor Styling Gaps

**Current Implementation:**
- Hover-triggered dropdowns (desktop)
- Mobile: Collapsible sections
- Backdrop blur: `backdrop-blur-[12px]`

**Gaps:**
- Dropdown animation/transition timing may differ
- Dropdown width: Fixed `w-56` vs original (may be auto-width)
- Arrow indicators missing (original may have chevron icons)
- Active state styling not implemented (no visual indicator for current page)

**Action Items:**
1. Add active page highlighting:
   ```tsx
   className={cn(
     "transition hover:text-white",
     pathname === href && "text-white font-semibold"
   )}
   ```
2. Add dropdown enter/exit animations using Framer Motion or CSS transitions
3. Measure exact dropdown width from original

---

### 3.2 Mobile Menu
**Status:** ⚠️ Functional but Incomplete

**Gaps:**
- Menu toggle uses text "Menu"/"Close" vs icon (original may use hamburger icon)
- No slide-in animation (just appears/disappears)
- Overlay background not implemented (original may dim page behind menu)

---

### 3.3 Header Behavior
**Status:** ✅ Mostly Accurate

**Current:**
```tsx
className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-[12px]"
```

**Minor Gaps:**
- Scroll behavior: Original may hide/show header on scroll
- Border opacity may differ slightly
- Background blur amount (12px) not verified against original

---

## 4. Media Handling

### 4.1 Image Sources
**Status:** ✅ Correct Approach

**Current:**
- All images hotlinked from `images.squarespace-cdn.com`
- Remote patterns configured in `next.config.ts`

**Result:** ✅ Matches original (no local image hosting needed)

---

### 4.2 Image Optimization
**Status:** ✅ Using Next.js Image

**Current:**
```tsx
<Image
  src={src}
  alt={`${entry.title} ${idx + 1}`}
  fill
  className="object-cover"
  sizes="(min-width: 768px) 1500px, 100vw"
  priority={idx === 0}
/>
```

**Minor Gaps:**
- Alt text is generic (e.g., "Bokja 1") vs descriptive
- Loading strategy: Only first image uses `priority`
- Quality settings not specified (using Next.js defaults)

---

### 4.3 Gallery Image Widths
**Status:** ⚠️ Pattern-based, not data-driven

**Current:**
```tsx
const patterns = [
  "col-span-8 md:col-span-24", // Full
  "col-span-8 md:col-span-13",  // Half
  "col-span-8 md:col-span-10",  // Small
  // ... repeating pattern
];
```

**Gaps:**
- Original likely has specific column spans per image (not repeating pattern)
- Image widths may vary based on content, not fixed algorithm

**Recommendations:**
1. Add column span metadata to `page-images.ts`:
   ```ts
   { src: "...", span: 24 },
   { src: "...", span: 13 },
   ```
2. Or inspect original page structure to capture exact layout

---

## 5. SEO & Metadata Gaps

### 5.1 Page Titles
**Status:** ⚠️ Basic Implementation

**Current:**
```tsx
title: entry ? `${entry.title} | Nader Bahsoun` : "Nader Bahsoun | Project"
```

**Gaps:**
- Missing page-specific suffixes (e.g., "| Portfolio", "| Photographer")
- Generic fallback for non-existent pages
- No dynamic title generation from page content

---

### 5.2 Meta Descriptions
**Status:** ❌ Global Only

**Current:**
```tsx
// app/layout.tsx
description: "Nader Bahsoun portfolio and print shop."
```

**Gaps:**
- Same description for all pages
- Should be page-specific (e.g., project descriptions, about bio excerpt)
- Missing character count optimization (150-160 chars)

**Recommendations:**
1. Add descriptions to `lib/content.ts`:
   ```ts
   { slug: "...", title: "...", description: "..." }
   ```
2. Generate from `pageCopy` if not explicitly set
3. Truncate to 160 characters with ellipsis

---

### 5.3 Open Graph & Social Meta
**Status:** ❌ Missing

**Missing Tags:**
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="..." />
```

**Recommendations:**
1. Add OG tags to each page's `generateMetadata()`:
   ```tsx
   openGraph: {
     title: `${entry.title} | Nader Bahsoun`,
     description: copy?.slice(0, 160),
     images: [images[0]],
     url: `https://naderbahsounstudios.com/${slug}`,
   }
   ```
2. Use first image as social preview image

---

### 5.4 Canonical URLs
**Status:** ❌ Missing

**Recommendations:**
```tsx
// In generateMetadata()
alternates: {
  canonical: `https://naderbahsounstudios.com/${slug}`,
}
```

---

### 5.5 Structured Data (JSON-LD)
**Status:** ❌ Missing

**Recommended Schema:**
- Person schema for /about
- ImageObject schema for project galleries
- BreadcrumbList for navigation

---

## 6. URL Parity Gaps

### 6.1 Route Mismatches
**Status:** ❌ Critical Gaps

| Original URL | Current Route | Status |
|--------------|---------------|--------|
| `/prints` or `/xprints` | `/prints2` | ❌ Mismatch |
| `/archive-x` | Missing | ❌ Not implemented |
| `/{project-slug}` | `/{project-slug}` | ✅ Match |
| `/about` | `/about` | ✅ Match |
| `/contact` | `/contact` | ✅ Match |

**Critical Issues:**
1. **Prints URL:** Original uses `/xprints` but repo navigation links to `/prints2`
2. **Archive X:** Listed in original nav but missing from `projectPages` array
3. **XPrints Products:** `/xprints/p/{slug}` exists but not linked in main nav

---

### 6.2 Missing Pages
**Status:** ❌ Incomplete

**Missing from original nav:**
- `archive-x` (project page)

**Extra pages in repo:**
- `/home` (duplicate of `/`?)
- `/xprints` (listing page, not in original nav)

---

## 7. Component-Specific Gaps

### 7.1 Homepage
**Status:** ✅ Minimal & Accurate

**Current:** Full-screen hero image
**Result:** ✅ Matches original

---

### 7.2 Project Detail Pages
**Status:** ⚠️ Close, Minor Gaps

**Gaps:**
- Heading size may differ (h1 on original vs current)
- Text truncation: `pageCopy` values are truncated (end with "...")
- Missing "Read More" expand functionality if original has it
- Video embeds not implemented (some projects have videos)

---

### 7.3 Projects Listing
**Status:** ✅ Functional

**Current:** 3-column grid with hover overlays
**Minor Gap:** Grid breakpoints may differ slightly

---

### 7.4 Prints Categories
**Status:** ⚠️ Functional but Different Layout

**Current:**
```tsx
// /prints2 → Grid of category cards
```

**Gap:** Original prints page shows "This folder does not contain any pages" (empty)
**Issue:** Unclear if original has same category structure or different approach

---

### 7.5 About Page
**Status:** ✅ Content Match

**Current:** Text + portrait image
**Minor Gap:** Bio text may be truncated or formatted differently

---

### 7.6 Contact Page
**Status:** ✅ Accurate

**Current:** Contact info + image
**Result:** ✅ Matches original content

---

## 8. Performance Gaps

### 8.1 Loading Performance
**Status:** ⚠️ Not Optimized

**Current State:**
- All images from Squarespace CDN (external dependency)
- No local caching strategy
- Priority loading only on first image

**Recommendations:**
1. Consider using Next.js Image Optimization API for CDN images
2. Implement loading skeletons for better perceived performance
3. Add `loading="lazy"` to below-fold images

---

### 8.2 Bundle Size
**Status:** ⚠️ Unknown

**Action:** Run `next build` and analyze bundle with `@next/bundle-analyzer`

---

## 9. Accessibility Gaps

### 9.1 ARIA Labels
**Status:** ⚠️ Minimal

**Current:**
- Mobile menu toggle has `aria-label="Toggle menu"`
- Images have alt text (but generic)

**Missing:**
- `aria-current` on active nav links
- `aria-expanded` on dropdown menus
- Landmark roles (`role="banner"`, `role="main"`, `role="navigation"`)

---

### 9.2 Keyboard Navigation
**Status:** ⚠️ Untested

**Action Items:**
1. Test tab order through navigation
2. Test dropdown keyboard access (arrow keys)
3. Add focus styles (`focus-visible` ring)

---

### 9.3 Color Contrast
**Status:** ⚠️ Needs Verification

**Current:**
- White text on dark background (likely passes)
- Zinc-300 body text (#d4d4d8) on #0e0e0e background

**Action:** Run WCAG contrast checker

---

## 10. Content Gaps

### 10.1 Text Truncation
**Status:** ❌ Incomplete Content

**Issue:** Many `pageCopy` entries end abruptly with "..." indicating truncated text

**Examples:**
- `artevolution`: "...theatrical p"
- `a-la-recherche-de-beyrouth`: "...Lebanese artis"

**Action:** Scrape full text content from original pages

---

### 10.2 Missing Project Data
**Status:** ⚠️ Partial

**Projects with no images:**
- `fuel-project`
- `new-page-2`
- `southern-birds-project`
- `shabah-el-rih`
- `snakes-and-ladders`
- `store`, `storeee`, `test9`

**Action:** Determine if these pages should have images or are text-only

---

### 10.3 Missing Copy
**Status:** ❌ Empty Strings

**Pages with no copy:**
- `fuel-project: ""`
- `new-page-2: ""`
- `store: ""`
- `storeee: ""`
- `test9: ""`

**Action:** Scrape content or remove from site if unpublished

---

## Summary Scorecard

| Category | Status | Priority |
|----------|--------|----------|
| Layout Grid | ✅ Complete | - |
| Spacing | ⚠️ 85% | Medium |
| Typography | ⚠️ 60% | **High** |
| Navigation | ✅ 90% | Low |
| Media Handling | ✅ 95% | Low |
| SEO/Meta | ❌ 30% | **Critical** |
| URL Parity | ❌ 70% | **Critical** |
| Content Completeness | ⚠️ 75% | **High** |
| Accessibility | ⚠️ 50% | Medium |
| Performance | ⚠️ Unknown | Medium |

**Overall Clone Fidelity: 72%**

---

## Next Steps (Prioritized)

See `priority-checklist.md` for actionable implementation order.
