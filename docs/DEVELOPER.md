# Developer Guide

## Architecture

This is a Next.js 14 App Router application with:

- **Server Components** - Default for all pages (SEO, performance)
- **Client Components** - Marked with 'use client' for interactivity
- **API Routes** - REST API in `/api/` directory
- **Prisma ORM** - Database abstraction with SQLite

## Key Patterns

### i18n (Internationalization)
- Locale detected from URL: `/fa/...` or `/en/...`
- Dictionaries in `src/i18n/dictionaries/`
- Server: `const dict = await getDictionary(locale)`
- Client: `const { t } = useTranslation()`

### Authentication
- NextAuth.js with JWT strategy
- Credentials provider (email/password)
- Role-based access: ADMIN, ATTORNEY, CLIENT

### RTL Support
- `dir="rtl"` set on `<html>` for Persian
- Tailwind RTL utilities work automatically
- Animations use `slideRight` for RTL, `slideLeft` for LTR

### Database
- Prisma schema in `prisma/schema.prisma`
- Models: User, Client, Case, Article, Service, FAQ, etc.
- Run `npx prisma studio` to browse data

### Forms
- React Hook Form + Zod validation
- Schemas in `src/lib/validations.ts`
- Server-side validation also available

## Code Conventions

- TypeScript strict mode
- Prefer server components over client components
- Use `cn()` for conditional classes
- Use `@/` path alias for imports
- All components in `src/components/`
- All utilities in `src/lib/`

## Testing

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run build       # Production build
```

## Adding New Pages

1. Create `src/app/[locale]/your-page/page.tsx`
2. Add metadata with `generateMetadata`
3. Add translations to both dictionaries
4. Add to navigation in Header.tsx

## Adding New API Routes

1. Create `src/app/api/your-route/route.ts`
2. Export GET/POST/etc functions
3. Use `getServerSession` for auth
4. Use rate limiting from `src/lib/security.ts`

## Adding New Components

1. Create in appropriate `src/components/` subdirectory
2. Mark with 'use client' if interactive
3. Use existing UI patterns (card, btn-primary, input-field)
4. Export and import in pages
