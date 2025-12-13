# Route Parity & Redirects Plan
**Target:** https://www.naderbahsounstudios.com
**Date:** 2025-12-13

---

## Current State Analysis

### Route Inventory

#### ✅ Matching Routes
| Original URL | Current Route | Status |
|--------------|---------------|--------|
| `/` | `/` (app/page.tsx) | ✅ Match |
| `/about` | `/about` | ✅ Match |
| `/contact` | `/contact` | ✅ Match |
| `/{project-slug}` | `/{slug}` (app/[slug]/page.tsx) | ✅ Match |
| `/projects` | `/projects` | ✅ Match (listing page) |
| `/co-creations` | `/co-creations` | ✅ Match (listing page) |

#### ❌ Mismatched Routes
| Original URL | Current Route | Issue |
|--------------|---------------|-------|
| `/xprints` or `/prints` | `/prints2` | Different slug |
| `/xprints/p/{slug}` | `/xprints/p/{slug}` | ✅ Exists but `/prints2` used in nav |
| `/archive-x` | Missing | Not implemented |

#### ⚠️ Extra Routes (Not in Original Nav)
| Route | Purpose | Action |
|-------|---------|--------|
| `/home` | Duplicate homepage? | Investigate & remove or redirect to `/` |
| `/xprints` | Products listing | Keep (valid page, just not in nav) |
| `/prints2` | Categories listing | **Rename to `/prints`** |
| `/prints2/{category}` | Category pages | **Rename to `/prints/{category}`** |

---

## Critical Issues

### Issue #1: Prints URL Mismatch
**Problem:** Original site uses `/xprints` for prints, but repo uses `/prints2` in navigation and routing.

**Original Site Structure:**
- Main prints URL: `/prints` (aliased as `/xprints`)
- Note: Original prints page appears empty ("This folder does not contain any pages")

**Current Repo Structure:**
- Prints listing: `/prints2`
- Category pages: `/prints2/{category}` (ashura, beqaa, colored, etc.)
- Product detail pages: `/xprints/p/{slug}`

**Conflict:**
- Navigation links to `/prints2` but product detail uses `/xprints/p/`
- Inconsistent naming scheme

---

### Issue #2: Missing Archive X Page
**Problem:** `archive-x` is listed in original nav under "Projects" but missing from `lib/content.ts` projectPages array.

**Evidence:**
- WebFetch result shows "Archive X" (`/archive-x`) in Projects dropdown
- Not found in `projectPages` array in `lib/content.ts`
- Likely a new/featured project that wasn't scraped initially

**Impact:**
- Users expecting this page will get 404
- Navigation structure incomplete

---

### Issue #3: Homepage Duplicate
**Problem:** Both `/` (app/page.tsx) and `/home` (app/home/page.tsx) exist.

**Current State:**
- `/` → Full-screen hero image (active homepage)
- `/home` → Purpose unknown (not inspected)

**Action Needed:**
- Verify `/home` purpose
- If duplicate: Remove or redirect to `/`
- If different: Document purpose

---

## Redirect Strategy

### Approach 1: Rename Routes (Recommended)
**Rationale:** Cleaner URLs, no redirect overhead, matches original exactly.

#### Steps:
1. **Rename `/prints2` → `/prints`**
   ```bash
   mv app/prints2 app/prints
   ```

2. **Update all references:**
   - `components/site-header.tsx` → Change `/prints2` to `/prints`
   - `lib/content.ts` → Update any references
   - Internal links across the site

3. **Update category routes:**
   - Already at `/prints2/[category]` → becomes `/prints/[category]` automatically
   - No additional work needed (follows folder structure)

4. **Keep `/xprints/p/{slug}` as-is:**
   - Product detail pages remain at `/xprints/p/`
   - This matches original structure (if `/xprints` is an alias for `/prints`)

**Result:**
- `/prints` → Prints categories listing
- `/prints/{category}` → Category galleries
- `/xprints/p/{slug}` → Individual print products

---

### Approach 2: Add Redirects (Fallback)
**Use case:** If renaming causes issues or if backward compatibility needed.

#### Implementation in `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  // ... existing config
  async redirects() {
    return [
      // Redirect old prints2 URLs to new prints URLs
      {
        source: '/prints2',
        destination: '/prints',
        permanent: true, // 301 redirect
      },
      {
        source: '/prints2/:category',
        destination: '/prints/:category',
        permanent: true,
      },
      // Redirect /home to homepage (if duplicate)
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
```

**When to use:**
- If you need to maintain old URLs for SEO
- If external links point to `/prints2`
- During gradual migration

---

## Action Plan

### Phase 1: Route Renaming (Immediate)
**Timeline:** 1 hour

1. **Rename prints2 → prints**
   ```bash
   cd /Users/husseinkazoun/nader-site
   git mv app/prints2 app/prints
   ```

2. **Update site-header.tsx**
   ```tsx
   // Before:
   <Link href="/prints2" ...>Prints</Link>

   // After:
   <Link href="/prints" ...>Prints</Link>
   ```

3. **Test routes:**
   ```bash
   npm run dev
   # Visit:
   # http://localhost:3000/prints
   # http://localhost:3000/prints/ashura
   # http://localhost:3000/xprints/p/{any-slug}
   ```

4. **Verify navigation:**
   - Click "Prints" in header → should go to `/prints`
   - Categories should link to `/prints/{category}`
   - All pages should load correctly

---

### Phase 2: Add Archive X Page (High Priority)
**Timeline:** 30 minutes

1. **Add to content.ts:**
   ```ts
   // lib/content.ts
   export const projectPages: SimplePage[] = [
     { slug: "archive-x", title: "Archive X" },
     { slug: "a-la-recherche-de-beyrouth", title: "A la recherche de Beyrouth" },
     // ... rest
   ];
   ```

2. **Add to page-images.ts:**
   ```ts
   // lib/page-images.ts
   export const pageImages: Record<string, string[]> = {
     "archive-x": [
       // Add image URLs from original page
     ],
     // ... rest
   };
   ```

3. **Add to page-copy.ts:**
   ```ts
   // lib/page-copy.ts
   export const pageCopy: Record<string, string> = {
     "archive-x": "...", // Scrape from original
     // ... rest
   };
   ```

4. **Update site-header dropdown:**
   ```tsx
   // components/site-header.tsx
   const projectsSubmenu = [
     { slug: "archive-x", title: "Archive X" }, // Add first (featured)
     { slug: "southern-birds-project", title: "Southern Birds" },
     // ... rest
   ];
   ```

5. **Verify:**
   - Visit http://localhost:3000/archive-x
   - Check Projects dropdown shows "Archive X"
   - Click link → should load page

---

### Phase 3: Resolve /home Duplicate (Low Priority)
**Timeline:** 15 minutes

1. **Inspect `/home` page:**
   ```bash
   cat app/home/page.tsx
   ```

2. **Decision tree:**
   - **If identical to `/`:** Delete `app/home/` folder
   - **If different:** Document purpose, decide if needed
   - **If unused:** Delete and add redirect

3. **If deleting:**
   ```bash
   rm -rf app/home
   ```

4. **Add redirect in `next.config.ts`:**
   ```ts
   {
     source: '/home',
     destination: '/',
     permanent: true,
   }
   ```

---

### Phase 4: Verify All Routes (Testing)
**Timeline:** 30 minutes

#### Route Checklist
- [ ] `/` → Homepage (hero image)
- [ ] `/about` → About page
- [ ] `/contact` → Contact page
- [ ] `/projects` → Projects listing
- [ ] `/co-creations` → Co-creations listing
- [ ] `/prints` → Prints categories (formerly /prints2)
- [ ] `/prints/ashura` → Ashura category
- [ ] `/prints/beqaa` → Beqaa category
- [ ] `/prints/colored` → Colored category
- [ ] `/prints/protests` → Protests category
- [ ] `/prints/street-beirut` → Street Beirut category
- [ ] `/prints/the-south` → The South category
- [ ] `/xprints` → XPrints listing
- [ ] `/xprints/p/{any-slug}` → Product detail
- [ ] `/archive-x` → Archive X project (new)
- [ ] `/{project-slug}` → Any project (test 5 random)

#### Navigation Checklist
- [ ] Header "Prints" link → goes to `/prints`
- [ ] Projects dropdown → includes "Archive X"
- [ ] Projects dropdown → all links work
- [ ] Co-creations dropdown → all links work
- [ ] Mobile menu → all links work
- [ ] Footer links (if any) → all work

---

## URL Mapping Table

### Final URL Structure

| Page Type | Original URL | Final Route | Notes |
|-----------|--------------|-------------|-------|
| Homepage | `/` | `/` | ✅ |
| About | `/about` | `/about` | ✅ |
| Contact | `/contact` | `/contact` | ✅ |
| Projects Listing | `/projects` | `/projects` | ✅ Custom page (not in original nav) |
| Co-creations Listing | `/co-creations` | `/co-creations` | ✅ Custom page (not in original nav) |
| Prints Categories | `/prints` or `/xprints` | `/prints` | ✅ Renamed from /prints2 |
| Print Category | `/prints/{category}` | `/prints/{category}` | ✅ Renamed from /prints2/ |
| XPrints Products | `/xprints` | `/xprints` | ✅ Product listing page |
| Product Detail | `/xprints/p/{slug}` | `/xprints/p/{slug}` | ✅ Individual products |
| Archive X | `/archive-x` | `/archive-x` | ⚠️ To be added |
| Project Pages | `/{slug}` | `/{slug}` | ✅ Dynamic routes |

### Redirects to Implement (Optional)

```ts
// next.config.ts
async redirects() {
  return [
    // Legacy /prints2 → /prints
    {
      source: '/prints2',
      destination: '/prints',
      permanent: true,
    },
    {
      source: '/prints2/:category',
      destination: '/prints/:category',
      permanent: true,
    },
    // Duplicate /home → /
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
  ];
}
```

---

## Validation Checklist

After implementing all changes:

### 1. Manual Testing
- [ ] Visit every route in the URL mapping table
- [ ] Click every navigation link
- [ ] Test mobile menu
- [ ] Test dropdown menus
- [ ] Verify no 404 errors

### 2. Automated Testing
```bash
# Generate all routes
npm run build

# Check build output for routes
# Verify staticParams generation
```

### 3. Link Checker
```bash
# Option 1: Use linkinator
npx linkinator http://localhost:3000 --recurse

# Option 2: Manual check
# Visit each page and verify no broken links
```

### 4. SEO Verification
- [ ] Check canonical URLs point to correct paths
- [ ] Verify sitemap.xml (if generated)
- [ ] Test social share preview URLs

---

## Migration Strategy (If Deploying to Production)

### Pre-Deployment
1. **Document current URLs** (screenshot or export routes)
2. **Backup current codebase**
3. **Test locally** with all changes

### Deployment
1. **Deploy renamed routes** (prints2 → prints)
2. **Add redirects** for backward compatibility
3. **Monitor 404s** in analytics

### Post-Deployment
1. **Update external links** (if any)
2. **Update sitemap**
3. **Verify Google Search Console** (no crawl errors)
4. **Keep redirects** for 3-6 months minimum

---

## Notes

### Why `/xprints` and `/prints` Coexist
**Hypothesis:** Original Squarespace site may use:
- `/prints` → Alias or folder for print categories
- `/xprints` → Actual product store (e-commerce section)

**Current repo structure mirrors this:**
- `/prints` → Categories/galleries (browsing)
- `/xprints/p/` → Individual products (purchase pages)

**Recommendation:** Keep both, as they serve different purposes:
- `/prints` = Browse by category
- `/xprints` = Shop individual items

### Archive X Priority
Based on navigation prominence (first item in Projects dropdown), Archive X is likely a featured/new project. **High priority to implement.**

---

## Summary

**Immediate Actions:**
1. ✅ Rename `app/prints2` → `app/prints`
2. ✅ Update navigation links
3. ⚠️ Add `archive-x` project page
4. ⚠️ Investigate & resolve `/home` duplicate

**Optional Actions:**
- Add redirects in `next.config.ts` for backward compatibility
- Keep redirects if deploying to production

**Testing:**
- Manually verify all routes load
- Check navigation links work correctly
- Test on mobile and desktop

**Timeline:**
- Phase 1 (Rename): 1 hour
- Phase 2 (Archive X): 30 min
- Phase 3 (/home): 15 min
- Phase 4 (Testing): 30 min
- **Total: ~2.5 hours**
