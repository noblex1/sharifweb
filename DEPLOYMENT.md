# Deployment Guide

## Environment Variables

This project requires environment variables to be set for production deployment.

### Required Environment Variables

- `VITE_WEB3FORMS_ACCESS_KEY` - Your Web3Forms API access key for the contact form

### Setting Environment Variables

#### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `VITE_WEB3FORMS_ACCESS_KEY` with your access key value
4. Ensure it's set for "Production", "Preview", and "Development" environments
5. Redeploy your application

#### For Netlify:
1. Go to Site settings → Environment variables
2. Click "Add a variable"
3. Key: `VITE_WEB3FORMS_ACCESS_KEY`
4. Value: Your access key
5. Click "Save"
6. Trigger a new deploy

#### For Other Platforms:
Set the environment variable `VITE_WEB3FORMS_ACCESS_KEY` in your hosting platform's environment variable settings before building.

### Getting Your Web3Forms Access Key

1. Visit [Web3Forms](https://web3forms.com/)
2. Sign up or log in
3. Create a new access key
4. Copy the access key and set it as `VITE_WEB3FORMS_ACCESS_KEY`

### Important Notes

- **Environment variables prefixed with `VITE_` are exposed to the client-side code**
- Make sure to set the environment variable in your hosting platform, not just in `.env` files
- The `.env` file is for local development only
- After setting environment variables, you may need to rebuild/redeploy your application

### Testing in Production

After deploying, test the contact form:
1. Fill out the form on your live site
2. Check the browser console for any errors
3. Verify emails are received at your configured email address

### Troubleshooting

If the contact form doesn't work in production:

1. **Check environment variable is set:**
   - Verify `VITE_WEB3FORMS_ACCESS_KEY` is configured in your hosting platform
   - Check that it's available for the production environment

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for errors in the Console tab
   - Check Network tab to see if the API request is being made

3. **Verify Web3Forms configuration:**
   - Ensure your access key is active
   - Check if there are any domain restrictions on your Web3Forms account
   - Verify the email receiving the messages is correct

4. **Rebuild after setting variables:**
   - Some platforms require a new build after setting environment variables
   - Try triggering a new deployment
