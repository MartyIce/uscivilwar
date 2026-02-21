# Civil War Interactive Map - Monetization Plan

## Executive Summary

Your app already has a **full FastAPI backend** with 20+ REST endpoints - just needs deployment infrastructure. Data is only ~62KB (can bundle into frontend build). This enables a **$0/month MVP** that scales cheaply.

---

## 1. Hosting Strategy (Low Cost + Scalable)

### Recommended Architecture

```
Cloudflare (DNS/CDN) ─── Free SSL, edge caching
         │
    ┌────┴────┐
    │         │
 Vercel    Railway (when needed)
 (Free)    ($5/mo)
    │         │
 Frontend  FastAPI + PostgreSQL
 + bundled   (user features,
   JSON      auth, rate limits)
```

### Phase 1: $0/month (MVP)
- **Frontend**: Vercel free tier (100GB bandwidth)
- **Data**: Bundle 62KB JSON directly in Vite build - no API needed
- **No backend** until you need user accounts

### Phase 2: $5-15/month (With Users)
- **Backend**: Railway ($5/mo) for FastAPI
- **Database**: Railway PostgreSQL addon ($5/mo) or Supabase free tier
- **Use when**: User accounts, saved favorites, API rate limiting

### Cost by Traffic Level

| Monthly Visitors | Hosting Cost |
|------------------|--------------|
| 0-10K | **$0** |
| 10K-50K | **$5-15** |
| 50K-200K | **$42** |
| 200K+ | **$95** |

---

## 2. Monetization: Anonymous Users

### A. Ads (Start Day 1)

**Google AdSense** - No requirements, $1-3 RPM

Placements:
- Header banner (728x90)
- Sidebar in filter panel (300x250)
- Native ads in detail panel ("Books about this battle")

**Upgrade path**: Ezoic at 10K visits ($5-15 RPM)

### B. Email Collection

**ConvertKit** (free up to 1000 subscribers)

Value props:
1. "Battle of the Week" newsletter
2. "On This Day in 1863..." daily digest
3. Lead magnet: PDF "50 Most Decisive Battles"

Implementation: Modal popup after 30 seconds or scroll

### C. Store Links

Add to DetailPanel.tsx:
```tsx
<div className="bg-amber-50 p-3 rounded-lg">
  <a href="/store/prints?battle={id}">Order this battle map - $29.99</a>
  <a href="amazon.com/dp/XXX?tag=yoursite-20">Related books</a>
</div>
```

---

## 3. Identity/Login System

### Recommended: Supabase Auth (Free up to 50K MAU)

Why: You get auth + PostgreSQL + realtime in one free tier. Already compatible with your SQLAlchemy backend.

### Features by Tier

| Feature | Anonymous | Free (Logged In) | Premium ($5-10/mo) |
|---------|-----------|------------------|-------------------|
| View battles | ✓ | ✓ | ✓ |
| Event details | 5/session | Unlimited | Unlimited |
| Save favorites | ✗ | ✓ | ✓ |
| API access | ✗ | 100/day | 1000/day |
| Export data | ✗ | ✗ | ✓ |
| Ad-free | ✗ | ✗ | ✓ |
| High-res downloads | ✗ | ✗ | ✓ |

### API Pricing Tiers

| Tier | Price | Rate Limit |
|------|-------|------------|
| Free | $0 | 100/day |
| Hobbyist | $5/mo | 1,000/day |
| Developer | $20/mo | 10,000/day |
| Enterprise | $100/mo | 100,000/day |

---

## 4. E-commerce Store

### Recommended Stack

**Phase 1**: Gumroad ($0, 9% fee) for digital products
- High-res map downloads ($5-10)
- PDF battle guides ($15)

**Phase 2**: Shopify Lite ($9/mo) + Printful for physical goods
- Poster prints ($29-45)
- Canvas maps ($60)
- T-shirts ($25)

### Product Ideas & Margins

| Product | POD Cost | Price | Profit |
|---------|----------|-------|--------|
| 18x24 Poster | $13 | $29.99 | $17 (57%) |
| 24x36 Poster | $18 | $44.99 | $27 (60%) |
| Canvas 16x20 | $25 | $59.99 | $35 (58%) |
| T-Shirt | $12 | $24.99 | $13 (52%) |

### White Label Opportunities
- Printful/Printify: Design your own, they print & ship
- Use your map visualizations as artwork
- "My Ancestor's Regiment" custom maps (genealogy angle)

---

## 5. Revenue Projections

### Conservative (Year 1)

| Quarter | Visitors/mo | Revenue |
|---------|-------------|---------|
| Q1 | 2,000 | $20/mo |
| Q2 | 5,000 | $80/mo |
| Q3 | 8,000 | $180/mo |
| Q4 | 12,000 | $320/mo |

**Year 1 Total: ~$2,000** | Costs: ~$60 | Profit: ~$1,940

### Moderate (Year 1)

| Quarter | Visitors/mo | Revenue |
|---------|-------------|---------|
| Q1 | 10,000 | $150/mo |
| Q2 | 25,000 | $490/mo |
| Q3 | 40,000 | $1,030/mo |
| Q4 | 60,000 | $1,800/mo |

**Year 1 Total: ~$12,500** | Costs: ~$500 | Profit: ~$12,000

### Optimistic (Year 1)

| Quarter | Visitors/mo | Revenue |
|---------|-------------|---------|
| Q1 | 30,000 | $620/mo |
| Q2 | 75,000 | $1,900/mo |
| Q3 | 150,000 | $4,100/mo |
| Q4 | 250,000 | $8,200/mo |

**Year 1 Total: ~$52,000** | Costs: ~$2,000 | Profit: ~$50,000

---

## 6. Marketing Strategy

### Free Channels (Prioritize These)

**Reddit** (High potential):
- r/history (17M) - Educational posts
- r/civilwar (25K) - Direct audience
- r/MapPorn (2M) - Map screenshots
- r/dataisbeautiful (20M) - Data visualizations
- r/genealogy (150K) - "Find your ancestor's battles"

**SEO** (Long-term):
- Target: "civil war battles map" (4.4K/mo)
- Target: "battle of gettysburg map" (3.6K/mo)
- Create individual pages per battle with meta tags

**Content Marketing**:
- "On This Day" Twitter bot (auto-post from your data)
- YouTube Shorts: Timeline animations
- Guest posts on history blogs

**Partnerships**:
- American Battlefield Trust
- State historical societies
- K-12 teachers (free classroom access)

### Paid Channels (After 10K organic)

| Channel | CPC | Test Budget |
|---------|-----|-------------|
| Google Ads | $0.50-2 | $100/mo |
| Facebook | $0.30-1 | $100/mo |
| Pinterest | $0.10-0.50 | $50/mo |

---

## Implementation Phases

### Phase 1: Launch MVP (Week 1-2)
- [ ] Deploy to Vercel (free)
- [ ] Bundle JSON into frontend build
- [ ] Add Google AdSense (2 placements)
- [ ] Add email signup (ConvertKit)
- [ ] Basic SEO meta tags
- **Cost**: $0 | **Revenue**: $0-50/mo

### Phase 2: Growth (Week 3-8)
- [ ] Reddit launch campaign
- [ ] Create individual battle pages for SEO
- [ ] Launch "On This Day" Twitter bot
- [ ] Gumroad store (PDF downloads)
- [ ] Weekly email newsletter
- **Cost**: $0-20/mo | **Revenue**: $50-200/mo

### Phase 3: Monetize (Month 2-4)
- [ ] Shopify + Printful for physical goods
- [ ] Supabase Auth for user accounts
- [ ] Premium tier with API access
- [ ] Affiliate links in detail panels
- [ ] Upgrade to Ezoic if >10K visitors
- **Cost**: $50-100/mo | **Revenue**: $200-1000/mo

### Phase 4: Scale (Month 4-12)
- [ ] Railway backend for full user features
- [ ] Rate-limited API tiers
- [ ] Educational partnerships
- [ ] Paid advertising tests
- **Cost**: $100-300/mo | **Revenue**: $1000-5000/mo

---

## Key Files to Modify

### Frontend
- `frontend/vite.config.ts` - Bundle JSON, add analytics plugins
- `frontend/src/App.tsx` - Ad placements, email modal, auth provider
- `frontend/src/components/DetailPanel/` - Store links, affiliate buttons

### Backend
- `backend/api/main.py` - Auth middleware, rate limiting
- `backend/api/config.py` - Tier definitions, Supabase config

### New Files Needed
- `vercel.json` - Deployment config
- `frontend/src/components/EmailCapture.tsx` - Email signup modal
- `frontend/src/components/AdUnit.tsx` - Ad wrapper component
- `frontend/src/lib/supabase.ts` - Auth client

---

## Verification

1. **Hosting**: `vercel deploy` and confirm site loads
2. **Ads**: Check AdSense dashboard for impressions
3. **Email**: Test signup flow, confirm ConvertKit receives
4. **Store**: Place test order through Gumroad
5. **Auth**: Sign up/login flow works
6. **API**: Rate limits enforced correctly
