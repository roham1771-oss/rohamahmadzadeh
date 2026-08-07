# Installation Guide

## Prerequisites

- Node.js 18+ 
- npm 9+
- Git

## Step-by-Step Installation

### 1. Clone the repository

```bash
git clone https://github.com/vakilahmadzadeh/vakilahmadzadeh.ir.git
cd vakilahmadzadeh.ir
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your settings. See [Environment Variables](./ENVIRONMENT.md).

### 4. Set up database

```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Start development server

```bash
npm run dev
```

### 6. Access the application

- Website: http://localhost:3000/fa
- English: http://localhost:3000/en
- Admin: http://localhost:3000/fa/admin

### Default Admin Credentials

- Email: admin@vakilahmadzadeh.ir
- Password: Admin@123

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### Database issues
```bash
rm prisma/dev.db
npx prisma db push
npx tsx prisma/seed.ts
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```
