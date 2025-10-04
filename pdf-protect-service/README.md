# PDF Protect Service

PDF Protect Service – microservice with Express + qpdf for real PDF encryption/decryption. Works as companion to Supabase Functions (protect-pdf/unlock-pdf).

## Features

- **Protect PDF** with password (qpdf 128-bit encryption)
- **Unlock PDF** (remove password if known)
- Express server with CORS, Helmet, Multer
- Dockerized (Debian + Node 20 + qpdf)
- `/health` check endpoint
- Secure proxy authentication

## Local Development

### Prerequisites
- Node.js 20+
- Docker (optional)
- qpdf (optional for local testing)

### Setup
```bash
# Install dependencies
npm install

# Run the service
node server.js
```

### Test Health
```bash
curl http://localhost:8080/health
```

Expected response:
```json
{"ok": true}
```

## Docker Local

### Build and Run
```bash
# Build the Docker image
docker build -t pdf-protect-service .

# Run the container
docker run --rm -p 8080:8080 -e PROXY_SECRET=supersecret-change-this pdf-protect-service
```

### Test Health
```bash
curl http://localhost:8080/health
```

## Deploy to Render (Free Tier)

### 1. Prepare Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/pdf-protect-service.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Render will auto-detect the Dockerfile
5. Configure the service:
   - **Name**: `pdf-protect-service`
   - **Environment**: `Docker`
   - **Region**: Choose closest to your users

### 3. Set Environment Variables
In Render dashboard, go to your service → Environment tab:

```
PORT=8080
PROXY_SECRET=supersecret-change-this
```

### 4. Deploy
- Click **Deploy** and wait until status shows **Live**
- Your service will be available at: `https://pdf-protect-service.onrender.com`

## Testing on Render

### Health Check
```bash
curl https://pdf-protect-service.onrender.com/health
```

### Protect PDF
```bash
curl -X POST -H "x-proxy-secret: supersecret-change-this" \
  -F "file=@sample.pdf" -F "password=abc123" \
  https://pdf-protect-service.onrender.com/protect --output protected.pdf
```

### Unlock PDF
```bash
curl -X POST -H "x-proxy-secret: supersecret-change-this" \
  -F "file=@protected.pdf" -F "password=abc123" \
  https://pdf-protect-service.onrender.com/unlock --output unlocked.pdf
```

## Integrate with Supabase

### 1. Set Environment Variables in Supabase
```bash
# Set the PDF protector service URL
supabase secrets set PDF_PROTECTOR_URL="https://pdf-protect-service.onrender.com/protect"

# Set the proxy secret (must match your service)
supabase secrets set PDF_PROTECTOR_SECRET="supersecret-change-this"
```

### 2. Deploy Supabase Functions
```bash
# Deploy the protect-pdf function
supabase functions deploy protect-pdf --no-verify-jwt

# Deploy the unlock-pdf function  
supabase functions deploy unlock-pdf --no-verify-jwt
```

### 3. Test Integration
```bash
# Test protect-pdf function
curl -X POST https://your-project.supabase.co/functions/v1/protect-pdf \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -F "file=@sample.pdf" \
  -F "password=test123"

# Test unlock-pdf function
curl -X POST https://your-project.supabase.co/functions/v1/unlock-pdf \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -F "file=@protected.pdf" \
  -F "password=test123"
```

## API Endpoints

### POST /protect
Protects a PDF with password encryption.

**Headers:**
- `x-proxy-secret`: Authentication token

**Body (multipart/form-data):**
- `file`: PDF file to protect
- `password`: Password for encryption (optional, defaults to "123456")

**Response:**
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename=protected.pdf`

### POST /unlock
Removes password protection from a PDF.

**Headers:**
- `x-proxy-secret`: Authentication token

**Body (multipart/form-data):**
- `file`: Password-protected PDF file
- `password`: Current password

**Response:**
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename=unlocked.pdf`

### GET /health
Health check endpoint.

**Response:**
```json
{"ok": true}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `PROXY_SECRET` | Authentication secret | `change_me` |

## Notes

- **Security**: Use a strong `PROXY_SECRET` in production
- **Free Tier Limitations**: Render free dynos may spin down on inactivity (cold start ~30s)
- **Production Alternatives**: For production, consider:
  - Google Cloud Run
  - Fly.io
  - Railway
  - AWS Lambda
  - Azure Container Instances

## Troubleshooting

### Common Issues

1. **qpdf not found**: Ensure qpdf is installed in the Docker container
2. **Permission denied**: Check file permissions in temporary directory
3. **Memory issues**: Large PDFs may require more memory allocation
4. **Cold starts**: Free tier services may have cold start delays

### Debug Commands

```bash
# Check service logs
docker logs <container-id>

# Test qpdf locally
qpdf --version

# Test with verbose output
curl -v https://your-service.com/health
```

## License

MIT License - see LICENSE file for details.

