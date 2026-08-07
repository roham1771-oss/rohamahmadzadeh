# Deployment Guide

## Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel dashboard
3. Set environment variables
4. Deploy

Vercel auto-detects Next.js. The `vercel.json` is pre-configured.

## Docker

```bash
# Build and run
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Linux VPS (Nginx + PM2)

### 1. Server setup

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx
```

### 2. Deploy application

```bash
# Clone and setup
git clone <repo-url> /var/www/vakilahmadzadeh
cd /var/www/vakilahmadzadeh
npm install
cp .env.example .env
# Edit .env with production values
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run build
```

### 3. Start with PM2

```bash
pm2 start npm --name "vakilahmadzadeh" -- start
pm2 save
pm2 startup
```

### 4. Configure Nginx

```bash
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Certificate

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d vakilahmadzadeh.ir -d www.vakilahmadzadeh.ir
```

## Node.js Server

```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

## Environment Variables for Production

See [ENVIRONMENT.md](./ENVIRONMENT.md) for all required variables.

Minimum required:
- DATABASE_URL
- NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
- NEXTAUTH_URL (https://vakilahmadzadeh.ir)
- ADMIN_EMAIL
- ADMIN_PASSWORD
