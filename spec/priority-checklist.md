# Priority Execution Checklist
**Goal:** Pixel-Identical Clone of https://www.naderbahsounstudios.com
**Strategy:** Highest-impact fixes first, then refinements

---

## Priority Levels

- 🔴 **Critical:** Blocking issues, broken functionality, major visual differences
- 🟡 **High:** Significant gaps, SEO issues, content missing
- 🟢 **Medium:** Minor refinements, polish, optimization
- 🔵 **Low:** Nice-to-have, future enhancements

---

## Phase 1: Critical Fixes (Day 1) 🔴

### 1.1 Fix Route Mismatches
**Priority:** 🔴 Critical
**Time:** 1 hour
**Impact:** Users can't access prints section with correct URL

**Tasks:**
- [ ] Rename `app/prints2` to `app/prints`
  ```bash
  git mv app/prints2 app/prints
  ```
- [ ] Update `components/site-header.tsx`:
  ```tsx
  // Line 93: Change href="/prints2" to href="/prints"
  <Link href="/prints" className="...">Prints</Link>
  ```
- [ ] Update mobile menu (line 164):
  ```tsx
  <Link href="/prints" className="...">Prints</Link>
  ```
- [ ] Test routes:
  - Visit http://localhost:3000/prints
  - Visit http://localhost:3000/prints/ashura
  - Verify all category pages load
- [ ] Commit changes:
  ```bash
  git add .
  git commit -m "fix: rename /prints2 to /prints for URL parity"
  ```

**Verification:**
- [ ] All print category URLs work at `/prints/{category}`
- [ ] Navigation "Prints" link goes to `/prints`
- [ ] No 404 errors on print pages

---

### 1.2 Add Missing Archive X Project
**Priority:** 🔴 Critical
**Time:** 30 minutes
**Impact:** Featured project in nav returns 404

**Tasks:**
1. **Scrape Archive X content:**
   - [ ] Visit https://www.naderbahsounstudios.com/archive-x
   - [ ] Copy all text content
   - [ ] Copy image URLs (first 6 images)

2. **Add to lib/content.ts:**
   ```ts
   export const projectPages: SimplePage[] = [
     { slug: "a-la-recherche-de-beyrouth", title: "A la recherche de Beyrouth" },
     // ADD THIS LINE (alphabetical order):
     { slug: "archive-x", title: "Archive X" },
     { slug: "alternative-beirut", title: "Alternative Beirut" },
     // ... rest
   ];
   ```

3. **Add to lib/page-images.ts:**
   ```ts
   export const pageImages: Record<string, string[]> = {
     // ... existing entries
     "archive-x": [
       "https://images.squarespace-cdn.com/...",  // Image 1
       "https://images.squarespace-cdn.com/...",  // Image 2
       // ... up to 6 images
     ],
     // ... rest
   };
   ```

4. **Add to lib/page-copy.ts:**
   ```ts
   export const pageCopy: Record<string, string> = {
     // ... existing entries
     "archive-x": "Full text description from original page...",
     // ... rest
   };
   ```

5. **Update site-header.tsx dropdown:**
   ```tsx
   const projectsSubmenu = [
     { slug: "archive-x", title: "Archive X" },  // ADD FIRST (featured)
     { slug: "southern-birds-project", title: "Southern Birds" },
     { slug: "i-was-naver", title: "I Was Never" },
     // ... rest
   ];
   ```

6. **Test:**
   - [ ] Visit http://localhost:3000/archive-x
   - [ ] Verify page loads with content and images
   - [ ] Check Projects dropdown shows "Archive X"

7. **Commit:**
   ```bash
   git add lib/content.ts lib/page-images.ts lib/page-copy.ts components/site-header.tsx
   git commit -m "feat: add archive-x project page"
   ```

**Verification:**
- [ ] `/archive-x` returns 200 (not 404)
- [ ] Page displays title, description, and images
- [ ] Projects dropdown includes "Archive X" as first item

---

### 1.3 Complete Truncated Content
**Priority:** 🔴 Critical
**Time:** 2 hours
**Impact:** Project pages show incomplete text ("...theatrical p")

**Tasks:**
1. **Identify truncated entries:**
   ```bash
   # Find all entries ending with incomplete text
   grep -E '"\.\.\.' lib/page-copy.ts
   ```

2. **For each truncated entry:**
   - [ ] Visit original page URL
   - [ ] Copy full text content
   - [ ] Replace truncated entry in `lib/page-copy.ts`

3. **Priority order (most visible first):**
   - [ ] `three-decades-and-a-climax` (in nav dropdown)
   - [ ] `the-bleed-zine` (in nav dropdown)
   - [ ] `southern-birds-project` (in nav dropdown)
   - [ ] `i-was-naver` (in nav dropdown)
   - [ ] All co-creations projects
   - [ ] Remaining projects

4. **Commit:**
   ```bash
   git add lib/page-copy.ts
   git commit -m "content: complete all truncated project descriptions"
   ```

**Verification:**
- [ ] No project descriptions end mid-sentence
- [ ] All visible text matches original site
- [ ] Read at least 3 project pages to verify completeness

---

### 1.4 Add SEO Meta Tags
**Priority:** 🔴 Critical
**Time:** 1.5 hours
**Impact:** Poor social sharing, missing search engine info

**Tasks:**
1. **Update app/layout.tsx (global meta):**
   ```tsx
   export const metadata: Metadata = {
     title: {
       default: "Nader Bahsoun | Photographer & Visual Artist",
       template: "%s | Nader Bahsoun",
     },
     description: "Multidisciplinary artist from southern Lebanon exploring memory, identity, and history through photography and documentary methods.",
     openGraph: {
       type: "website",
       locale: "en_US",
       url: "https://naderbahsounstudios.com",
       siteName: "Nader Bahsoun Studios",
       images: [
         {
           url: "https://images.squarespace-cdn.com/...", // Homepage hero
           width: 1200,
           height: 630,
           alt: "Nader Bahsoun Photography",
         },
       ],
     },
     twitter: {
       card: "summary_large_image",
       creator: "@naderbahsoun", // Verify actual handle
     },
     robots: {
       index: true,
       follow: true,
     },
   };
   ```

2. **Update app/[slug]/page.tsx (project pages):**
   ```tsx
   export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
     const { slug } = await params;
     const entry = projectPages.find((page) => page.slug === slug);
     const images = pageImages[slug] ?? [];
     const copy = pageCopy[slug];

     if (!entry) return {};

     const description = copy?.slice(0, 160) || "Photography project by Nader Bahsoun";

     return {
       title: entry.title,
       description,
       openGraph: {
         title: entry.title,
         description,
         images: images[0] ? [images[0]] : [],
         url: `https://naderbahsounstudios.com/${slug}`,
         type: "article",
       },
       twitter: {
         card: "summary_large_image",
         title: entry.title,
         description,
         images: images[0] ? [images[0]] : [],
       },
       alternates: {
         canonical: `https://naderbahsounstudios.com/${slug}`,
       },
     };
   }
   ```

3. **Update other static pages:**
   - [ ] `app/about/page.tsx`
   - [ ] `app/contact/page.tsx`
   - [ ] `app/projects/page.tsx`
   - [ ] `app/co-creations/page.tsx`
   - [ ] `app/prints/page.tsx`

   **Example (about page):**
   ```tsx
   export const metadata: Metadata = {
     title: "About",
     description: "Nader Bahsoun (b. 1995) is a self-taught multidisciplinary artist from southern Lebanon whose work delves into memory, identity, and the complexities of history.",
     openGraph: {
       title: "About Nader Bahsoun",
       description: "...",
       images: [pageImages["about"]?.[0]].filter(Boolean),
       url: "https://naderbahsounstudios.com/about",
     },
     alternates: {
       canonical: "https://naderbahsounstudios.com/about",
     },
   };
   ```

4. **Test:**
   ```bash
   # Build to verify metadata
   npm run build

   # Check meta tags in browser:
   # View page source → look for <meta property="og:...">
   # Use https://metatags.io to preview
   ```

5. **Commit:**
   ```bash
   git add app/layout.tsx app/\[slug\]/page.tsx app/about/page.tsx # ... etc
   git commit -m "seo: add comprehensive meta tags and Open Graph data"
   ```

**Verification:**
- [ ] View page source shows `<meta property="og:title">` tags
- [ ] Social media preview tools show correct title/description/image
- [ ] Google search console validates structured data (post-deployment)

---

## Phase 2: High-Priority Gaps (Day 2) 🟡

### 2.1 Extract & Apply Correct Typography
**Priority:** 🟡 High
**Time:** 2 hours
**Impact:** Font differences make site look "off"

**Tasks:**
1. **Inspect original site typography:**
   - [ ] Open https://www.naderbahsounstudios.com in Chrome
   - [ ] Open DevTools (F12) → Elements tab
   - [ ] Click on H1 element → inspect Computed styles:
     - Font family
     - Font size (desktop & mobile)
     - Font weight
     - Line height
     - Letter spacing
   - [ ] Repeat for: H2, body text, navigation, buttons
   - [ ] Document in a table:
     ```
     | Element | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
     |---------|-------------|----------------|---------------|--------|-------------|----------------|
     | H1      | ?           | ?              | ?             | ?      | ?           | ?              |
     | Body    | ?           | ?              | ?             | ?      | ?           | ?              |
     | Nav     | ?           | ?              | ?             | ?      | ?           | ?              |
     ```

2. **Create Tailwind typography config:**
   ```bash
   # Create tailwind.config.ts if not exists
   touch tailwind.config.ts
   ```

   ```ts
   // tailwind.config.ts
   import type { Config } from "tailwindcss";

   export default {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx,mdx}",
       "./components/**/*.{js,ts,jsx,tsx,mdx}",
       "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
       extend: {
         fontFamily: {
           // Replace with actual fonts from inspection:
           sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
           // If original uses custom font:
           display: ["CustomFont", "sans-serif"],
         },
         fontSize: {
           // Custom sizes from inspection:
           "h1-mobile": ["36px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
           "h1-desktop": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
           "body": ["18px", { lineHeight: "1.6", letterSpacing: "0" }],
           "nav": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em" }],
         },
       },
     },
     plugins: [],
   } satisfies Config;
   ```

3. **Add font imports to app/layout.tsx:**
   ```tsx
   // If using Google Fonts:
   import { Inter } from "next/font/google";

   const inter = Inter({ subsets: ["latin"] });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={inter.className}>
         {/* ... */}
       </html>
     );
   }
   ```

4. **Update globals.css:**
   ```css
   /* app/globals.css */
   @import "tailwindcss";

   :root {
     --background: #0e0e0e;
     --foreground: #ededed;
   }

   @theme inline {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
     /* Add font family from config */
     --font-sans: var(--font-inter), "Helvetica Neue", Arial, sans-serif;
   }

   body {
     background: var(--background);
     color: var(--foreground);
     /* Remove hardcoded font-family: Arial */
   }
   ```

5. **Update component classes:**
   - [ ] Replace `text-4xl` with `text-h1-mobile md:text-h1-desktop`
   - [ ] Replace `text-sm` in nav with `text-nav`
   - [ ] Update all heading sizes across site

6. **Test:**
   - [ ] Compare side-by-side with original (screenshot overlay test)
   - [ ] Verify font renders correctly on multiple browsers
   - [ ] Check mobile responsive sizes

7. **Commit:**
   ```bash
   git add tailwind.config.ts app/globals.css app/layout.tsx
   git commit -m "style: apply exact typography from original site"
   ```

**Verification:**
- [ ] Fonts match original (visually indistinguishable)
- [ ] Heading sizes match at all breakpoints
- [ ] Line heights and letter spacing match

---

### 2.2 Fix Spacing Inconsistencies
**Priority:** 🟡 High
**Time:** 1.5 hours
**Impact:** Layout doesn't feel "pixel-perfect"

**Tasks:**
1. **Measure original spacing:**
   - [ ] Open original site in DevTools
   - [ ] Measure padding/margin between:
     - Header and page content
     - Title and description
     - Description and image gallery
     - Images in gallery
     - Sections on homepage

2. **Create spacing scale:**
   ```ts
   // tailwind.config.ts
   theme: {
     extend: {
       spacing: {
         // Add custom values if needed:
         '18': '4.5rem',  // 72px
         '22': '5.5rem',  // 88px
       },
     },
   }
   ```

3. **Standardize component spacing:**
   - [ ] Update `app/[slug]/page.tsx`:
     ```tsx
     // Before: space-y-12
     // After: space-y-16 (if that matches original)
     <div className="mx-auto max-w-[1500px] space-y-16">
     ```
   - [ ] Update all pages with consistent spacing
   - [ ] Verify `py-20` matches original header offset

4. **Test:**
   - [ ] Overlay screenshot of original on local site
   - [ ] Verify spacing matches exactly

5. **Commit:**
   ```bash
   git add tailwind.config.ts app/**/*.tsx
   git commit -m "style: standardize spacing to match original"
   ```

**Verification:**
- [ ] Section spacing visually matches original
- [ ] No jarring spacing differences
- [ ] Consistent spacing across all pages

---

### 2.3 Add Missing Project Images
**Priority:** 🟡 High
**Time:** 2 hours
**Impact:** Many projects show "No images available"

**Tasks:**
1. **Identify projects with missing images:**
   ```bash
   # Check page-images.ts for empty arrays
   grep -A 1 '"\[\]' lib/page-images.ts
   ```

2. **For each project with no images:**
   - [ ] Visit original page
   - [ ] Open Network tab → filter by Images
   - [ ] Copy first 6 image URLs
   - [ ] Add to `lib/page-images.ts`:
     ```ts
     "shabah-el-rih": [
       "https://images.squarespace-cdn.com/...",
       "https://images.squarespace-cdn.com/...",
       // ... up to 6
     ],
     ```

3. **Priority order:**
   - [ ] Projects in nav dropdown (shabah-el-rih, snakes-and-ladders, etc.)
   - [ ] Featured projects (southern-birds-project)
   - [ ] All other projects

4. **Commit:**
   ```bash
   git add lib/page-images.ts
   git commit -m "content: add missing project images"
   ```

**Verification:**
- [ ] All nav dropdown projects have images
- [ ] No "No images available" message on visible projects
- [ ] Images load correctly from Squarespace CDN

---

### 2.4 Implement Proper Image Column Spans
**Priority:** 🟡 High
**Time:** 3 hours
**Impact:** Image layouts don't match original's visual rhythm

**Current Issue:** Images use repeating pattern, not original layout.

**Tasks:**
1. **Scrape original image layouts:**
   - [ ] For each project, inspect grid structure
   - [ ] Document column spans in order:
     ```
     three-decades-and-a-climax:
       Image 1: 24 columns (full width)
       Image 2: 13 columns
       Image 3: 11 columns
       Image 4: 24 columns
       ...
     ```

2. **Create new data structure:**
   ```ts
   // lib/page-layouts.ts (new file)
   export type ImageLayout = {
     src: string;
     span: number; // Column span on desktop (mobile always 8)
   };

   export const pageLayouts: Record<string, ImageLayout[]> = {
     "three-decades-and-a-climax": [
       { src: "https://...", span: 24 },
       { src: "https://...", span: 13 },
       { src: "https://...", span: 11 },
       // ...
     ],
     // ... other projects
   };
   ```

3. **Update app/[slug]/page.tsx:**
   ```tsx
   import { pageLayouts } from "@/lib/page-layouts";

   export default async function ProjectPage({ params }: { params: Promise<Params> }) {
     const { slug } = await params;
     const layout = pageLayouts[slug];

     return (
       <div className="grid grid-cols-8 gap-[11px] md:grid-cols-24">
         {layout?.map(({ src, span }, idx) => (
           <div key={src} className={`col-span-8 md:col-span-${span}`}>
             <Image src={src} alt="..." fill />
           </div>
         ))}
       </div>
     );
   }
   ```

   **Note:** Tailwind doesn't support dynamic classes. Use this approach:
   ```tsx
   const colSpanClasses: Record<number, string> = {
     8: "col-span-8 md:col-span-8",
     10: "col-span-8 md:col-span-10",
     11: "col-span-8 md:col-span-11",
     13: "col-span-8 md:col-span-13",
     16: "col-span-8 md:col-span-16",
     24: "col-span-8 md:col-span-24",
   };

   <div className={colSpanClasses[span]}>
   ```

4. **Migrate 5 priority projects first:**
   - [ ] three-decades-and-a-climax
   - [ ] the-bleed-zine
   - [ ] msafreen
   - [ ] jal-el-bahr
   - [ ] alternative-beirut

5. **Test:**
   - [ ] Compare layouts side-by-side with original
   - [ ] Verify responsive behavior

6. **Commit:**
   ```bash
   git add lib/page-layouts.ts app/\[slug\]/page.tsx
   git commit -m "feat: implement exact image column spans from original"
   ```

**Verification:**
- [ ] Image layouts visually match original
- [ ] Grid flows correctly at all breakpoints
- [ ] No layout shift or awkward gaps

---

## Phase 3: Medium-Priority Polish (Day 3) 🟢

### 3.1 Add Navigation Active States
**Priority:** 🟢 Medium
**Time:** 1 hour

**Tasks:**
- [ ] Install `next/navigation` usePathname hook
- [ ] Update site-header.tsx:
  ```tsx
  "use client";
  import { usePathname } from "next/navigation";

  export function SiteHeader() {
    const pathname = usePathname();

    return (
      <Link
        href="/about"
        className={cn(
          "transition hover:text-white",
          pathname === "/about" && "text-white font-semibold"
        )}
      >
        About
      </Link>
    );
  }
  ```
- [ ] Add `cn()` utility from `clsx` + `tailwind-merge`
- [ ] Test all nav links for active state

**Verification:**
- [ ] Current page highlighted in nav
- [ ] Active state matches original styling

---

### 3.2 Improve Alt Text for Images
**Priority:** 🟢 Medium
**Time:** 1 hour

**Tasks:**
- [ ] Replace generic alt text ("Bokja 1") with descriptive text
- [ ] For projects, use: `${entry.title} — Image ${idx + 1}`
- [ ] For specific images, add custom alt text in data structure

**Verification:**
- [ ] Screen reader announces meaningful descriptions
- [ ] Alt text doesn't sound robotic

---

### 3.3 Add Loading States & Skeletons
**Priority:** 🟢 Medium
**Time:** 2 hours

**Tasks:**
- [ ] Create `<Skeleton />` component
- [ ] Add loading.tsx to routes:
  ```tsx
  // app/[slug]/loading.tsx
  export default function Loading() {
    return <ProjectSkeleton />;
  }
  ```
- [ ] Add blur placeholder to images:
  ```tsx
  <Image ... placeholder="blur" blurDataURL="data:image/..." />
  ```

**Verification:**
- [ ] Smooth loading experience
- [ ] No layout shift during image load

---

### 3.4 Optimize Performance
**Priority:** 🟢 Medium
**Time:** 2 hours

**Tasks:**
- [ ] Run Lighthouse audit
- [ ] Add `priority` to above-fold images
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Optimize image sizes (use Next.js `loader` if needed)
- [ ] Reduce bundle size (analyze with `@next/bundle-analyzer`)

**Verification:**
- [ ] Lighthouse score > 90 for Performance
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s

---

### 3.5 Add Dropdown Animations
**Priority:** 🟢 Medium
**Time:** 1.5 hours

**Tasks:**
- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] Wrap dropdown in AnimatePresence:
  ```tsx
  import { AnimatePresence, motion } from "framer-motion";

  {hoveredMenu === "projects" && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-full pt-2"
      >
        {/* dropdown content */}
      </motion.div>
    </AnimatePresence>
  )}
  ```

**Verification:**
- [ ] Dropdown fades in smoothly
- [ ] Matches original animation timing

---

## Phase 4: Low-Priority Enhancements (Day 4+) 🔵

### 4.1 Add Accessibility Improvements
**Priority:** 🔵 Low
**Time:** 2 hours

**Tasks:**
- [ ] Add `aria-current="page"` to active nav links
- [ ] Add `aria-expanded` to dropdown triggers
- [ ] Add keyboard navigation to dropdowns (arrow keys)
- [ ] Add skip-to-content link
- [ ] Test with screen reader (VoiceOver on Mac)
- [ ] Run axe DevTools audit

---

### 4.2 Investigate & Remove /home Duplicate
**Priority:** 🔵 Low
**Time:** 15 minutes

**Tasks:**
- [ ] Check if `/home` is used anywhere
- [ ] If not, delete `app/home/` folder
- [ ] Add redirect to `/` in `next.config.ts`

---

### 4.3 Add Structured Data (JSON-LD)
**Priority:** 🔵 Low
**Time:** 2 hours

**Tasks:**
- [ ] Add Person schema to `/about`
- [ ] Add ImageGallery schema to project pages
- [ ] Add BreadcrumbList to navigation
- [ ] Test with Google Rich Results Test

---

### 4.4 Add Analytics & Monitoring
**Priority:** 🔵 Low
**Time:** 1 hour

**Tasks:**
- [ ] Add Google Analytics (if needed)
- [ ] Add Vercel Analytics
- [ ] Set up 404 tracking
- [ ] Monitor Squarespace CDN performance

---

### 4.5 Create Sitemap
**Priority:** 🔵 Low
**Time:** 30 minutes

**Tasks:**
- [ ] Create `app/sitemap.ts`:
  ```ts
  import { MetadataRoute } from 'next';
  import { projectPages } from '@/lib/content';

  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      { url: 'https://naderbahsounstudios.com', lastModified: new Date() },
      { url: 'https://naderbahsounstudios.com/about', lastModified: new Date() },
      { url: 'https://naderbahsounstudios.com/contact', lastModified: new Date() },
      ...projectPages.map((p) => ({
        url: `https://naderbahsounstudios.com/${p.slug}`,
        lastModified: new Date(),
      })),
    ];
  }
  ```
- [ ] Test at http://localhost:3000/sitemap.xml

---

## Testing Checklist (After Each Phase)

### Visual Regression Testing
- [ ] Take screenshots of original site (all pages)
- [ ] Take screenshots of local site (all pages)
- [ ] Overlay and compare (use diff tool)
- [ ] Document any remaining differences

### Functional Testing
- [ ] All navigation links work
- [ ] All dropdown menus work
- [ ] All images load correctly
- [ ] Mobile menu works
- [ ] Contact links (email, phone) work
- [ ] Instagram link works
- [ ] All project pages load
- [ ] All print category pages load

### Cross-Browser Testing
- [ ] Chrome (Mac)
- [ ] Safari (Mac)
- [ ] Firefox (Mac)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)

### Performance Testing
- [ ] Run Lighthouse audit (Desktop & Mobile)
- [ ] Check Core Web Vitals
- [ ] Test on slow 3G network

---

## Summary Timeline

| Phase | Duration | Priority | Tasks |
|-------|----------|----------|-------|
| Phase 1: Critical Fixes | 5 hours | 🔴 | Routes, Archive X, Content, SEO |
| Phase 2: High-Priority | 8.5 hours | 🟡 | Typography, Spacing, Images, Layouts |
| Phase 3: Medium Polish | 7.5 hours | 🟢 | Active states, Loading, Performance, Animations |
| Phase 4: Low Enhancements | 5.5 hours | 🔵 | Accessibility, Structured data, Analytics |
| **Total** | **~26.5 hours** | | **~3-4 working days** |

---

## Definition of "Pixel-Identical"

**Achieved when:**
- [ ] All URLs match original structure
- [ ] All content complete (no truncation)
- [ ] Typography matches exactly (font, size, weight, spacing)
- [ ] Layout spacing matches exactly
- [ ] Image layouts match original grid structure
- [ ] Navigation behavior identical
- [ ] SEO meta tags comprehensive
- [ ] Visual comparison shows < 5% difference
- [ ] Lighthouse performance score > 90
- [ ] No console errors or warnings

**Final validation:**
- [ ] Side-by-side screenshot comparison
- [ ] Client approval
- [ ] QA checklist 100% complete
