# Swift Swiss Cart Deployment Guide

This guide provides step-by-step instructions for deploying the Swift Swiss Cart application to Netlify.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account with the repository pushed to it
- A Netlify account
- Admin access to the Supabase project

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository contains:
- The latest code with the admin page fixes
- The `netlify.toml` configuration file
- A working `package.json` with the correct build commands

### 2. Log in to Netlify

1. Go to [Netlify](https://app.netlify.com/) and log in with your account
2. Click on "New site from Git" in the dashboard

### 3. Connect to Your Git Provider

1. Choose your Git provider (GitHub, GitLab, or Bitbucket)
2. Authorize Netlify to access your repositories
3. Select the repository containing the Swift Swiss Cart project

### 4. Configure Build Settings

The existing `netlify.toml` file should automatically configure these settings, but verify they are correct:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `20`

### 5. Configure Environment Variables

1. In the Netlify dashboard, go to "Site settings" > "Environment variables"
2. Add the following environment variables:
   - `VITE_SUPABASE_URL`: Use the value from `env-fixed.txt`
   - `VITE_SUPABASE_ANON_KEY`: Use the value from `env-fixed.txt`
   - `VITE_ADMIN_PASSWORD`: Set a secure password for admin access

### 6. Deploy the Site

1. Click "Deploy site" to start the deployment process
2. Wait for the build and deployment to complete
3. Netlify will provide a URL for your deployed application (e.g., `https://your-site-name.netlify.app`)

### 7. Set Up Custom Domain (Optional)

1. In the Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain's DNS settings

### 8. Post-Deployment Verification

After deployment, verify:

1. The application loads correctly
2. User authentication works
3. Products display correctly on the main page
4. The admin interface works:
   - Navigate to `/admin-super-direct`
   - Verify you can view, add, edit, and delete products
   - Check that changes in the admin interface reflect on the frontend

### Troubleshooting

If you encounter issues:

1. **Build Failures**: Check the build logs in Netlify for specific errors
2. **API Connection Issues**: Verify environment variables are set correctly
3. **Missing Content**: Ensure your Supabase database has the necessary content
4. **Redirection Issues**: Check the redirects in the `netlify.toml` file

### Maintenance

Regular maintenance tasks:

1. **Update Dependencies**: Regularly update packages with `npm update` followed by testing and redeployment
2. **Monitor Performance**: Use Netlify analytics to monitor site performance
3. **Backup Data**: Regularly backup your Supabase database
4. **Check Security**: Periodically run `npm audit` and fix any vulnerabilities

## Conclusion

The application is now deployed and ready for use! Users can browse products on the main site, and administrators can manage products using the admin interface that now correctly synchronizes with the Supabase database. 