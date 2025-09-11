# Ailutions - Vercel Deployment Guide

## 🚀 Quick Fix for Build Error

### Current Build Error Solution:
The build is failing because of the monorepo structure. Here's how to fix it:

### 1. Vercel Dashboard Settings
When deploying in Vercel dashboard, use these **exact settings**:

**Framework Preset**: Other
**Root Directory**: `frontend`
**Build Command**: `npm run build`
**Output Directory**: `build`
**Install Command**: `npm install`

### 2. Alternative: Deploy Frontend Only First
Since you're getting build errors with the full-stack setup, let's deploy the frontend first:

1. In Vercel Dashboard → Settings → General
2. Change **Root Directory** to: `frontend`
3. This will deploy only the React app initially
4. You can add the backend API later

### 3. Environment Variables (After Frontend Deployment)
In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
REACT_APP_BACKEND_URL=https://your-app-name.vercel.app
```

### 4. For API Routes (Later Setup)
Once frontend is working, you can add API routes by:
1. Creating a separate Vercel project for the backend, OR
2. Using Vercel's API routes feature

## 🔄 Quick Deploy Steps (Frontend Only)

1. **Update Vercel Settings**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

2. **Redeploy**: This should fix the `craco: command not found` error

3. **Test**: Your Ailutions website should be live with all three assessment tools

## 🐛 Current Error Fix
The error `craco: command not found` happens because Vercel isn't finding the right directory structure. By setting **Root Directory** to `frontend`, it will:
- Install dependencies from `frontend/package.json`
- Run build commands in the right context
- Find the `craco` command properly

## ✅ After This Fix
Your website will be live at `https://your-app-name.vercel.app` with:
- Homepage with Hormozi-style conversion optimization
- ROI Calculator with PDF generation
- Digital Maturity Tracker with PDF reports
- Automation Readiness Assessment with implementation guides
- All lead capture forms (saving to localStorage initially)

## 🚀 Next Steps (Optional)
Once the frontend is deployed successfully:
1. Set up MongoDB Atlas for data persistence
2. Deploy backend API separately if needed
3. Update environment variables to connect to real database

**Try the deployment again with Root Directory set to `frontend` - this should resolve the build error!**