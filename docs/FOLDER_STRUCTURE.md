# Folder Structure

```
vakilahmadzadeh/
├── prisma/
│   ├── schema.prisma          # Database schema (23 models)
│   └── seed.ts                # Seed data
├── public/                    # Static assets
│   ├── icons/                 # PWA icons
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── [locale]/
│   │       ├── layout.tsx     # Locale layout with providers
│   │       ├── page.tsx       # Home page
│   │       ├── about/         # About page
│   │       ├── articles/      # Articles listing + detail
│   │       ├── calculators/   # Legal calculators
│   │       ├── contact/       # Contact page
│   │       ├── faq/           # FAQ page
│   │       ├── search/        # Search page
│   │       ├── services/      # Services listing + detail
│   │       ├── auth/          # Login, Register
│   │       ├── portal/        # Client portal
│   │       └── admin/         # Admin dashboard
│   │   └── api/
│   │       ├── auth/          # Authentication
│   │       ├── ai/            # AI chat
│   │       ├── admin/         # Admin stats
│   │       ├── articles/      # Articles CRUD
│   │       ├── clients/       # Clients CRUD
│   │       ├── cases/         # Cases CRUD
│   │       ├── contact/       # Contact form
│   │       ├── faq/           # FAQ
│   │       ├── newsletter/    # Newsletter
│   │       ├── search/        # Search
│   │       └── services/      # Services
│   ├── components/
│   │   ├── ai/                # AI chat widget
│   │   ├── layout/            # Header, Footer, Nav
│   │   ├── sections/          # Home page sections
│   │   └── shared/            # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts
│   │   ├── dictionaries/
│   │   │   ├── fa.json
│   │   │   ├── en.json
│   │   │   └── index.ts
│   │   └── hooks.ts
│   ├── lib/                   # Utilities
│   │   ├── ai/                # AI provider adapter
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── email.ts
│   │   ├── security.ts
│   │   ├── seo.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   └── constants.ts
│   ├── providers/             # React context providers
│   └── types/                 # TypeScript types
├── docker/                    # Docker configs
├── nginx/                     # Nginx configs
├── docs/                      # Documentation
└── package.json
```
