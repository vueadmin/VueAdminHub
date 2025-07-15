# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Quick Commands

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

### Code Quality
```bash
# Type checking (if available)
pnpm typecheck

# Linting (if available)
pnpm lint

# Format code (if available)
pnpm format
```

## 🏗️ Architecture Overview

This is a **Nuxt 3** application serving as a Vue.js admin dashboard resource platform. Key architectural aspects:

### Framework & Stack
- **Nuxt 3** with SSR/SSG capabilities
- **Vue 3** Composition API
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **VueUse** for composables
- **Nuxt Icon** for icons

### Directory Structure
```
├── pages/              # File-based routing (Nuxt 3)
│   ├── index.vue       # Homepage
│   ├── templates/      # Template listings & details
│   ├── ui-libraries/   # UI library listings & details
│   ├── tools/          # Development tools
│   ├── plugins/        # Plugin resources
│   └── search.vue      # Search functionality
├── components/         # Reusable Vue components
├── layouts/            # Layout components (default.vue)
├── data/               # Static resource data (resources.ts)
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── composables/        # Vue composables
└── server/             # API routes & server logic
```

### Key Data Flow
- **Resource data** is stored in `data/resources.ts` as static arrays
- **Dynamic pages** are generated from resource data in `/[category]/[id].vue`
- **Sitemap** is auto-generated from resource data (`server/routes/sitemap.xml.ts`)
- **SEO metadata** is dynamically injected per page using `useSeoMeta()`

### Resource Structure
Each resource has this interface:
```typescript
interface ResourceItem {
  id: string
  name: string
  description: string
  category: 'template' | 'ui-library' | 'tool' | 'plugin' | 'framework'
  vueVersion: '2.x' | '3.x' | 'both'
  stars: number
  lastUpdated: string
  author: string
  tags: string[]
  features: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'active' | 'maintenance' | 'deprecated'
  price: 'free' | 'paid' | 'freemium'
  isPopular?: boolean
  isRecommended?: boolean
}
```

### SEO & Performance
- **Structured data** via Schema.org JSON-LD
- **Open Graph** and Twitter Cards
- **Dynamic sitemap** generation
- **Canonical URLs** and meta tags
- **Responsive design** with mobile-first approach

### Routing Patterns
- **List pages**: `/templates`, `/ui-libraries`, `/tools`, `/plugins`
- **Detail pages**: `/{category}/{resource-id}`
- **Search**: `/search`
- **Home**: `/`

### Development Notes
- Uses **pnpm** as package manager
- **Hot module replacement** during development
- **Static generation** for production (SSG)
- **No backend** - all data is static JSON
- **SEO-optimized** with dynamic meta tags
- **Google Analytics** integration via gtag