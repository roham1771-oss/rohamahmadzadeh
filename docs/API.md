# API Documentation

All API routes are at `/api/`.

## Authentication

### POST /api/auth/register
Register a new user.

```json
{ "name": "string", "email": "string", "password": "string", "phone": "string" }
```

### POST /api/auth/[...nextauth]
NextAuth endpoints for login/session.

## Clients

### GET /api/clients
List clients. Requires auth.

Query params: `page`, `limit`, `search`

### POST /api/clients
Create client. Requires ADMIN/ATTORNEY role.

## Cases

### GET /api/cases
List cases. Auth required.

Query params: `page`, `limit`, `status`

### POST /api/cases
Create case. Requires ADMIN/ATTORNEY role.

## Articles

### GET /api/articles
List articles.

Query params: `page`, `limit`, `status`, `category`

### POST /api/articles
Create article. Requires ADMIN/ATTORNEY role.

## Services

### GET /api/services
List active services.

## FAQ

### GET /api/faq
List active FAQs.

Query params: `category`

## Contact

### POST /api/contact
Submit contact form.

```json
{ "name": "string", "email": "string", "subject": "string", "message": "string" }
```

Rate limited: 5 requests per 15 minutes per IP.

## Newsletter

### POST /api/newsletter
Subscribe to newsletter.

```json
{ "email": "string", "name": "string" }
```

## Search

### GET /api/search
Search across content.

Query params: `q`, `lang`

## AI Chat

### POST /api/ai/chat
Send message to AI assistant.

```json
{ "message": "string", "language": "fa|en", "sessionId": "string" }
```

Rate limited: 30 requests per 15 minutes per IP.

## Admin

### GET /api/admin/stats
Get dashboard statistics. Requires ADMIN/ATTORNEY role.

## Standard Response Format

```json
{
  "success": true,
  "data": {},
  "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 },
  "error": "string"
}
```

## Rate Limiting

- General: 100 requests per 15 minutes
- Contact form: 5 requests per 15 minutes
- AI chat: 30 requests per 15 minutes
