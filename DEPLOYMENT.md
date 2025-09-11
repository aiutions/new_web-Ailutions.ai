# Ailutions - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub/GitLab account with your code
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

### 2. Database Setup (MongoDB Atlas)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Create database user with username/password
4. Whitelist IP: `0.0.0.0/0` (for Vercel)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ailutions_db`

### 3. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Set **Root Directory** to: `./`
5. **Build Command**: `cd frontend && npm run build`
6. **Output Directory**: `frontend/build`
7. **Install Command**: `cd frontend && npm install`

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# In your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: ailutions
# - Directory: ./
# - Override settings? Yes
# - Build Command: cd frontend && npm run build
# - Output Directory: frontend/build
# - Dev Command: cd frontend && npm start
```

### 4. Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables:

**Add these variables:**
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/ailutions_db
DB_NAME=ailutions_db
CORS_ORIGINS=https://your-app-name.vercel.app
```

### 5. Update Frontend URL
After deployment, update your frontend `.env`:
```
REACT_APP_BACKEND_URL=https://your-app-name.vercel.app
```

Then redeploy or use the Vercel dashboard to set this as an environment variable.

### 6. Custom Domain (Optional)
1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `CORS_ORIGINS` environment variable

## 🔧 Project Structure for Vercel
```
/app/
├── vercel.json          # Vercel configuration
├── frontend/            # React app
│   ├── package.json
│   ├── build/          # Generated on deployment
│   └── src/
├── backend/            # FastAPI serverless functions
│   ├── server.py
│   └── requirements.txt
└── README.md
```

## 🐛 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Python requirements in `requirements.txt`

### API Routes Not Working?
- Check `vercel.json` routing configuration
- Verify `/api/*` routes are properly configured
- Check Vercel function logs

### Database Connection Issues?
- Verify MongoDB Atlas connection string
- Check network access settings (whitelist `0.0.0.0/0`)
- Ensure database user has proper permissions

### CORS Errors?
- Update `CORS_ORIGINS` environment variable
- Check if frontend URL matches backend CORS settings

## 📝 Post-Deployment Checklist
- [ ] All three assessment tools working
- [ ] PDF generation functional  
- [ ] Database connections successful
- [ ] Contact forms saving data
- [ ] All pages loading correctly
- [ ] Mobile responsive design working
- [ ] Analytics tracking setup (optional)

## 🔄 Continuous Deployment
Vercel automatically redeploys when you push to your main branch. For manual deployments:

```bash
vercel --prod
```

## 📞 Support
If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints using `/api/health`
4. Check MongoDB Atlas connection

Your Ailutions website will be live at: `https://your-app-name.vercel.app`