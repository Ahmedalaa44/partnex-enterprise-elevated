# Sanity CMS Deployment Checklist

This checklist guides you through completing the Sanity CMS integration for Partnex and deploying it to production.

## Phase 1: Sanity Project Setup (Initial - One time)

- [ ] **Create Sanity Organization & Project**
  - Go to https://www.sanity.io
  - Sign up or log in
  - Create a new project named "Partnex" 
  - Choose dataset: "production"
  - Note your Project ID
  
- [ ] **Get Sanity Project Credentials**
  - From Sanity dashboard, locate your Project ID
  - Copy it and save safely
  
- [ ] **Configure Environment Variables**
  - Update root `.env.local`:
    ```
    VITE_SANITY_PROJECT_ID=your_project_id_here
    VITE_SANITY_DATASET=production
    VITE_SANITY_API_VERSION=2026-07-01
    VITE_SANITY_USE_CDN=true
    ```
  - Update `studio/.env.local`:
    ```
    SANITY_STUDIO_PROJECT_ID=your_project_id_here
    SANITY_STUDIO_DATASET=production
    ```

- [ ] **Deploy Sanity Studio**
  ```bash
  cd studio
  npm install
  npm run deploy
  ```
  - Your studio will be at: `https://your-project-id.sanity.studio`

## Phase 2: Local Development Testing

- [ ] **Install Studio Dependencies**
  ```bash
  cd studio
  npm install
  ```

- [ ] **Populate Initial Content (Optional)**
  - Manually add some test content in Sanity Studio
  - Or import from backup if available

- [ ] **Test Local Development Server**
  ```bash
  npm run dev
  ```
  - Visit http://localhost:3000
  - Verify website loads without errors
  - Check browser console for any warnings

- [ ] **Test Studio Development**
  ```bash
  npm run studio:dev
  ```
  - Visit http://localhost:3333
  - Verify Studio loads
  - Make a test edit to any content
  - Click Publish

- [ ] **Test Content Updates**
  - Make a change in Studio
  - Publish the change
  - Refresh website at http://localhost:3000
  - Verify change appears

- [ ] **Test Fallback Content**
  - Temporarily remove `VITE_SANITY_PROJECT_ID` from `.env.local`
  - Refresh website
  - Verify default content appears
  - Restore the env variable

- [ ] **Build Verification**
  ```bash
  npm run build
  ```
  - Verify build completes without errors
  - Check that .vercel/output exists

## Phase 3: Vercel Deployment

- [ ] **Add Environment Variables to Vercel**
  - Log in to https://vercel.com
  - Go to Partnex project settings
  - Click "Environment Variables"
  - Add:
    - `VITE_SANITY_PROJECT_ID` = your_project_id
    - `VITE_SANITY_DATASET` = production
    - `VITE_SANITY_API_VERSION` = 2026-07-01
    - `VITE_SANITY_USE_CDN` = true

- [ ] **Deploy to Vercel**
  - Push `sanity-cms` branch to GitHub
  - Vercel will auto-deploy
  - Or manually trigger deployment in Vercel dashboard

- [ ] **Verify Vercel Deployment**
  - Visit https://partnex.net or your preview URL
  - Verify website loads completely
  - Check browser console for errors
  - Make a test change in Sanity
  - Publish and verify it appears on live site

## Phase 4: Client Account Setup

- [ ] **Invite Client to Sanity Project**
  - Go to Sanity project dashboard
  - Click "Members" in project settings
  - Click "Invite members"
  - Enter client email address
  - Select role: "Editor" (full permissions)
  - Send invitation

- [ ] **Verify Client Invitation**
  - Client should receive email from Sanity
  - Send them the link to login: https://sanity.io
  - Confirm they can access the Studio

- [ ] **Provide Documentation**
  - Send CLIENT_GUIDE.md to client
  - Send login instructions
  - Send studio URL
  - Send support contact information

## Phase 5: Production Content Migration

- [ ] **Migrate Existing Content (if needed)**
  - If you have existing content in another system:
    - Export it from old system
    - Import to Sanity (if automatic importer available)
    - Or manually recreate key content items

- [ ] **Verify All Content in Studio**
  - Hero Section: Complete ✅
  - About Section: Complete ✅
  - Services: At least 8 items ✅
  - Partners: Add your key partners ✅
  - Contact Information: Updated with real info ✅
  - Footer: Updated with links ✅
  - SEO: Meta tags populated ✅

- [ ] **Review Website Content**
  - Visit https://partnex.net
  - Verify all sections display correctly
  - Check all images load
  - Test all links work
  - Verify animations still work

## Phase 6: Testing & Quality Assurance

- [ ] **Functionality Testing**
  - [ ] Navigation works on desktop and mobile
  - [ ] All internal links work
  - [ ] External links open correctly
  - [ ] Forms submit properly (if any)
  - [ ] Images display correctly
  - [ ] No broken images or 404s

- [ ] **Performance Testing**
  - [ ] Website loads quickly (< 3 seconds)
  - [ ] No console errors
  - [ ] Lighthouse score > 80
  - [ ] Images are optimized

- [ ] **Mobile Responsiveness**
  - [ ] Responsive design works on phones
  - [ ] Responsive design works on tablets
  - [ ] Touch interactions work properly
  - [ ] Text is readable on small screens

- [ ] **Browser Compatibility**
  - [ ] Works in Chrome
  - [ ] Works in Firefox
  - [ ] Works in Safari
  - [ ] Works in Edge

- [ ] **CMS Functionality**
  - [ ] Content updates publish without errors
  - [ ] Changes appear within 2 seconds
  - [ ] Images upload successfully
  - [ ] New items (services, partners) appear
  - [ ] Deleted items are removed

## Phase 7: Documentation & Handoff

- [ ] **Complete Documentation**
  - ✅ CLIENT_GUIDE.md created
  - ✅ SANITY_SETUP.md created
  - ✅ Environment setup documented
  - ✅ Deployment process documented

- [ ] **Create Client Onboarding Materials**
  - [ ] Video tutorial (optional): How to edit content
  - [ ] Written guide: CLIENT_GUIDE.md
  - [ ] Login credentials and URLs
  - [ ] Emergency support contact

- [ ] **Prepare Support Resources**
  - [ ] Document common tasks
  - [ ] Create FAQ document
  - [ ] Set up support channel (email, Slack, etc.)
  - [ ] Assign support contact person

- [ ] **Final Handoff Meeting**
  - [ ] Walk through Studio interface with client
  - [ ] Show how to edit each section
  - [ ] Demonstrate publishing process
  - [ ] Explain where to find help
  - [ ] Answer client questions

## Phase 8: Post-Launch Monitoring

- [ ] **Monitor for Issues (First Week)**
  - [ ] Check website daily
  - [ ] Monitor error logs
  - [ ] Check for broken links
  - [ ] Verify content displays correctly
  - [ ] Be available for client support

- [ ] **Set Up Monitoring**
  - [ ] Configure Vercel monitoring alerts
  - [ ] Set up Sanity webhook logs
  - [ ] Enable error tracking (Sentry or similar)

- [ ] **Schedule Follow-up**
  - [ ] Check in with client after 1 week
  - [ ] Check in after 1 month
  - [ ] Schedule quarterly reviews

## Optional Enhancements

- [ ] **Set Up CDN for Images**
  - Configure Sanity image optimization
  - Enable image srcset for responsive images
  
- [ ] **Implement Webhooks**
  - Set up Vercel deploy hook in Sanity
  - Automatic rebuild on content changes
  - See SANITY_SETUP.md for details

- [ ] **Add More Content Types**
  - Blog posts
  - News/press releases
  - Customer testimonials
  - Additional service categories

- [ ] **Implement Multilingual Support**
  - If needed for international markets
  - Configure language variants in Sanity
  - Set up language routing

- [ ] **Add Advanced Features**
  - Custom SEO per page
  - A/B testing support
  - Analytics integration
  - Form builder integration

## Troubleshooting During Deployment

### Build Fails
```bash
npm run build
# Check for errors above, fix and retry
# Common issues: missing env variables, TypeScript errors
```

### Changes Don't Appear
1. Did you click "Publish" in Sanity Studio?
2. Wait 2-3 seconds and hard refresh (Ctrl+Shift+R)
3. Check browser console for errors
4. Verify VITE_SANITY_PROJECT_ID is correct

### Studio Won't Load
1. Verify SANITY_STUDIO_PROJECT_ID is set
2. Run `cd studio && npm install`
3. Check for network errors in browser console
4. Try incognito/private browsing

### Images Don't Upload
1. Check image file size (< 2MB)
2. Try a different image format (PNG, JPG)
3. Clear browser cache and try again
4. Check browser console for error details

### Client Can't Login
1. Verify email address is correct
2. Check spam folder for Sanity invitation email
3. Try password reset on Sanity login page
4. Verify email is invited with "Editor" role

## Deployment URLs

After completion, share these with your client:

- **Website**: https://partnex.net
- **Sanity Studio**: https://your-project-id.sanity.studio
- **Sanity Login**: https://sanity.io
- **Vercel Dashboard**: https://vercel.com/dashboard

## Final Checklist Summary

- [ ] Sanity project created and configured
- [ ] Environment variables set (root and Vercel)
- [ ] Local development tested
- [ ] Build verified (npm run build)
- [ ] Vercel deployment successful
- [ ] Client account created and invited
- [ ] Website content verified and complete
- [ ] Performance and QA testing complete
- [ ] Documentation provided to client
- [ ] Client support plan in place
- [ ] Post-launch monitoring configured

## Notes

Document any issues, customizations, or special considerations:

```
[Add your notes here]
```

---

**Status**: Ready for Production ✅

**Deployed By**: 
**Deployment Date**: 
**Last Updated**: 

For questions or issues, refer to SANITY_SETUP.md or contact support.
