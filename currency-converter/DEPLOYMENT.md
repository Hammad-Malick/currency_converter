# Currency Converter - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: For repository hosting
3. **Vercel CLI** (optional): `npm i -g vercel`

### Step 1: Push to GitHub Repository

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Currency Converter with TypeScript backend"

# Create GitHub repository and push
git branch -M main
git remote add origin https://github.com/yourusername/currency-converter.git
git push -u origin main
```

### Step 2: Deploy Backend to Vercel

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Backend Deployment:**
   - **Root Directory**: `backend`
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables:**
   ```
   API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
   NODE_ENV=production
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```

6. **Deploy Backend**
   - Your backend will be available at: `https://your-backend-name.vercel.app`

### Step 3: Deploy Frontend to Vercel

1. **Create New Project** (separate from backend)
2. **Import same GitHub repository**
3. **Configure Frontend Deployment:**
   - **Root Directory**: `frontend/currency-converter-app`
   - **Framework Preset**: `Angular`
   - **Build Command**: `ng build --configuration=production`
   - **Output Directory**: `dist/currency-converter-app`
   - **Install Command**: `npm install`

4. **No environment variables needed** (backend URL is auto-detected)

5. **Deploy Frontend**
   - Your frontend will be available at: `https://your-frontend-name.vercel.app`

### Step 4: Update CORS Configuration

After both deployments:

1. **Update Backend Environment Variables** in Vercel dashboard:
   ```
   CORS_ORIGINS=https://your-actual-frontend-url.vercel.app,http://localhost:4200
   ```

2. **Update Frontend Backend URL** (if needed):
   - Edit `frontend/currency-converter-app/src/app/services/currency.service.ts`
   - Replace the production URL with your actual backend URL

### Step 5: Test Deployment

1. **Test Backend Endpoints:**
   - `https://your-backend.vercel.app/test`
   - `https://your-backend.vercel.app/currencies`
   - `https://your-backend.vercel.app/convert?from=USD&to=EUR&amount=100`

2. **Test Frontend:**
   - Visit your frontend URL
   - Test currency conversion
   - Check conversion history
   - Verify mobile responsiveness

### Environment Variables Reference

**Backend (.env):**
```env
API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
NODE_ENV=production
PORT=3000
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:4200
```

**Frontend:**
- No environment variables needed
- Backend URL is auto-detected based on hostname

### Troubleshooting

**CORS Errors:**
- Ensure CORS_ORIGINS includes your frontend URL
- Check Vercel environment variables

**Build Failures:**
- Verify Node.js version compatibility
- Check build commands in vercel.json
- Review build logs in Vercel dashboard

**API Errors:**
- Verify API_KEY is set correctly
- Check backend deployment logs
- Test endpoints directly

### Quick Deploy Commands

```bash
# Using Vercel CLI (alternative method)
cd backend
vercel --prod

cd ../frontend/currency-converter-app
vercel --prod
```

## 🎉 Success!

Your Currency Converter is now live on Vercel with:
- ✅ TypeScript Backend (Serverless)
- ✅ Angular Frontend (SPA)
- ✅ Mobile-responsive design
- ✅ Persistent conversion history
- ✅ Production-ready deployment
