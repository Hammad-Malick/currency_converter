# 🚀 Vercel Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [x] Backend converted to professional TypeScript
- [x] Frontend updated with dynamic API URL detection
- [x] Vercel configuration files created
- [x] CORS settings updated for production
- [x] Environment variable handling implemented

### ✅ Files Ready for Deployment

#### Backend Files:
- [x] `backend/src/app.ts` - Main server with Vercel serverless support
- [x] `backend/vercel.json` - Vercel deployment configuration
- [x] `backend/package.json` - Dependencies and scripts
- [x] `backend/tsconfig.json` - TypeScript configuration

#### Frontend Files:
- [x] `frontend/currency-converter-app/vercel.json` - Angular SPA configuration
- [x] `frontend/currency-converter-app/src/app/services/currency.service.ts` - Auto-detecting API URL

## Deployment Steps

### Step 1: GitHub Repository
```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/currency-converter.git
git push -u origin main
```

### Step 2: Deploy Backend
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Framework**: Other
   - **Build Command**: `npm run build`

5. **Environment Variables** (Critical!):
   ```
   API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
   NODE_ENV=production
   ```

6. Deploy and note the URL: `https://your-backend-name.vercel.app`

### Step 3: Deploy Frontend
1. Create another "New Project"
2. Import same GitHub repository
3. Configure:
   - **Root Directory**: `frontend/currency-converter-app`
   - **Framework**: Angular
   - **Build Command**: `ng build --configuration=production`
   - **Output Directory**: `dist/currency-converter-app`

4. Deploy and note the URL: `https://your-frontend-name.vercel.app`

### Step 4: Update CORS (After Frontend Deployment)
1. Go to backend project settings in Vercel
2. Update environment variables:
   ```
   CORS_ORIGINS=https://your-actual-frontend-url.vercel.app,http://localhost:4200
   ```
3. Redeploy backend

### Step 5: Update Frontend Backend URL (If Needed)
1. Update `currency.service.ts` with actual backend URL
2. Commit and push changes
3. Frontend will auto-redeploy

## Testing Checklist

### ✅ Backend Tests
- [ ] `https://your-backend.vercel.app/test` returns JSON
- [ ] `https://your-backend.vercel.app/currencies` returns currency list
- [ ] `https://your-backend.vercel.app/convert?from=USD&to=EUR&amount=100` works

### ✅ Frontend Tests
- [ ] Frontend loads at your Vercel URL
- [ ] Currency dropdowns populate
- [ ] Conversion works end-to-end
- [ ] History persists
- [ ] Mobile responsive design works
- [ ] No CORS errors in browser console

### ✅ Integration Tests
- [ ] Frontend can communicate with backend
- [ ] Real currency conversion works
- [ ] History saves and displays correctly
- [ ] Error handling works properly

## Environment Variables Reference

### Backend Environment Variables (Vercel Dashboard):
```env
API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
NODE_ENV=production
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:4200
```

### No Frontend Environment Variables Needed
The frontend automatically detects the backend URL based on the deployment environment.

## Troubleshooting

### Common Issues:

**CORS Errors:**
- Ensure `CORS_ORIGINS` includes your frontend URL
- Redeploy backend after updating environment variables

**Build Failures:**
- Check build logs in Vercel dashboard
- Verify package.json scripts are correct
- Ensure Node.js version compatibility

**API Connection Issues:**
- Verify backend is deployed and responding
- Check network tab in browser developer tools
- Test backend endpoints directly

**Frontend Deployment Issues:**
- Ensure Angular build command is correct
- Check output directory setting
- Verify vercel.json configuration

## Final Success Criteria

✅ **Deployment Complete When:**
- [ ] Backend deployed successfully at Vercel URL
- [ ] Frontend deployed successfully at Vercel URL  
- [ ] End-to-end currency conversion works
- [ ] History functionality works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Both URLs are publicly accessible

## Quick Commands

```bash
# Test backend locally before deployment
cd backend && npm run build && npm start

# Test frontend locally before deployment  
cd frontend/currency-converter-app && ng build --configuration=production

# Quick deploy with Vercel CLI (alternative)
cd backend && vercel --prod
cd ../frontend/currency-converter-app && vercel --prod
```

## 🎉 You're Ready to Deploy!

Follow the steps above and your Currency Converter will be live on Vercel!
