# Environment Variables

Copy `.env.example` to `.env` and configure:

## Required

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Database connection | `file:./dev.db` |
| NEXTAUTH_SECRET | Secret for NextAuth | Random 32-byte string |
| NEXTAUTH_URL | Application URL | `https://vakilahmadzadeh.ir` |
| ADMIN_EMAIL | Admin email | `admin@vakilahmadzadeh.ir` |
| ADMIN_PASSWORD | Admin password | Strong password |

## Email (SMTP)

| Variable | Description | Default |
|----------|-------------|---------|
| SMTP_HOST | SMTP server | — |
| SMTP_PORT | SMTP port | `587` |
| SMTP_USER | SMTP username | — |
| SMTP_PASSWORD | SMTP password | — |
| SMTP_FROM | From address | — |

## AI (Optional)

| Variable | Description | Default |
|----------|-------------|---------|
| AI_PROVIDER | AI provider | `openai` |
| AI_API_KEY | API key | — |
| AI_MODEL | Model name | `gpt-4` |

## Site

| Variable | Description | Default |
|----------|-------------|---------|
| SITE_URL | Public URL | `https://vakilahmadzadeh.ir` |
| UPLOAD_DIR | Upload directory | `./public/uploads` |
| MAX_FILE_SIZE | Max upload (bytes) | `10485760` |

## Security

| Variable | Description | Default |
|----------|-------------|---------|
| RATE_LIMIT_WINDOW_MS | Rate limit window | `900000` |
| RATE_LIMIT_MAX_REQUESTS | Max requests | `100` |

## Generating NEXTAUTH_SECRET

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```
