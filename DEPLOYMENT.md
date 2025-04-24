# Brings Delivery App Deployment Guide

This document provides instructions for deploying the Brings Delivery application to production.

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

## Build Process

To build the application for production:

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

The build output will be in the `dist` directory, which contains the static files ready for deployment.

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Push your repository to GitHub, GitLab, or Bitbucket**

2. **Connect your repository to Netlify**:
   - Sign up/login to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Select your repository
   - Use the following build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: 20.x

3. **Environment Variables**:
   Add the following environment variables in the Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Deploy the site**:
   Netlify will automatically build and deploy your site. Each push to your main branch will trigger a new deployment.

### Option 2: Vercel

Vercel is another excellent platform for deploying React applications:

1. **Push your repository to GitHub, GitLab, or Bitbucket**

2. **Connect your repository to Vercel**:
   - Sign up/login to [Vercel](https://vercel.com/)
   - Import your repository
   - Use the following build settings:
     - Framework Preset: Vite
     - Build command: `npm run build`
     - Output directory: `dist`

3. **Environment Variables**:
   Add the same environment variables as above in the Vercel dashboard.

### Option 3: Manual Deployment

To deploy to your own web server:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the contents of the `dist` directory** to your web server (via FTP, SCP, etc.)

3. **Configure your web server**:
   - Set up URL rewriting to redirect all requests to `index.html` for client-side routing
   - Ensure proper caching headers for static assets
   - Enable HTTPS for secure connections

## Post-Deployment Verification

After deployment, verify the following:

1. The website loads correctly at the production URL
2. User authentication works properly
3. Product listings and search functionality work
4. The checkout process is functioning correctly
5. The admin dashboard is accessible and working

## Troubleshooting

If you encounter issues during deployment:

1. **Check environment variables** - Ensure all necessary variables are correctly set
2. **Verify build output** - The `dist` directory should contain all necessary files
3. **Check browser console** - Look for errors in the browser developer tools
4. **Inspect server logs** - Check hosting provider logs for any server-side issues

## Maintenance

Regular maintenance tasks include:

1. **Update dependencies** - Regularly update packages to get security fixes and new features
2. **Monitor application logs** - Keep an eye on errors and performance issues
3. **Back up the database** - Regularly back up the Supabase database
4. **Update SSL certificates** - Ensure SSL certificates are renewed before expiration

For additional help, contact the development team or refer to the project documentation. 