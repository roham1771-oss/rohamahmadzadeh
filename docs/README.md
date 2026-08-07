# vakilahmadzadeh.ir

**Ahmadzadeh Law Office - Complete Legal Practice Management Platform**

A production-ready bilingual (Persian/English) website for Attorney Roham Ahmadzadeh.

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
cp .env.example .env
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Visit [http://localhost:3000/fa](http://localhost:3000/fa)

## Features

- **Bilingual** - Full Persian (RTL) and English (LTR) support
- **Responsive** - Mobile-first design, works on all devices
- **Dark Mode** - System preference detection with manual toggle
- **SEO Optimized** - Metadata, sitemap, structured data
- **PWA Ready** - Offline support, installable
- **AI Assistant** - Provider-agnostic AI legal assistant
- **Client Portal** - Secure dashboard for clients
- **Admin Dashboard** - Complete practice management
- **CMS** - Article and content management
- **Security** - Rate limiting, input validation, auth

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM (SQLite)
- NextAuth.js
- Framer Motion
- Zod Validation

## Documentation

- [Installation Guide](./INSTALLATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Developer Guide](./DEVELOPER.md)
- [Administrator Guide](./ADMIN.md)
- [API Documentation](./API.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [Environment Variables](./ENVIRONMENT.md)

## License

All rights reserved. vakilahmadzadeh.ir
