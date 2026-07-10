# Sanity CMS Integration Guide

This project now uses **Sanity CMS** to manage all website content. The Sanity Studio is located in the `studio/` folder.

## Quick Start

### For Developers

1. **Install Studio Dependencies**
   ```bash
   cd studio
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create `studio/.env.local`:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

3. **Run the Studio**
   ```bash
   npm run dev
   # Or from root: npm run studio:dev
   ```
   
   The Studio will be available at `http://localhost:3333`

4. **Run the Website**
   
   In a separate terminal:
   ```bash
   npm run dev
   ```
   
   The website will be available at `http://localhost:3000`

### For Content Editors

Once deployed, your client can access the Sanity Studio dashboard at:
```
https://sanity.io/manage
```

They'll be able to edit:
- Hero section content
- About section
- Services
- Partners
- Projects
- Team members
- Contact information
- Footer content
- SEO settings

## Setting Up Your Sanity Project

### Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in
3. Create a new project:
   - Project name: "Partnex"
   - Dataset: "production"
   - Template: "Clean"

### Step 2: Get Your Project Credentials

1. After creating the project, you'll see your **Project ID**
2. Copy this ID and add it to `studio/.env.local`:
   ```
   SANITY_STUDIO_PROJECT_ID=your_id_here
   SANITY_STUDIO_DATASET=production
   ```

### Step 3: Deploy the Studio

```bash
cd studio
npm run deploy
```

The Studio will be available at:
```
https://your-project-id.sanity.studio
```

### Step 4: Connect Website to Sanity

Update the root `.env.local` file:
```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-07-01
VITE_SANITY_USE_CDN=true
```

## Content Structure

### Collections

#### 1. Hero Section
- Eyebrow badge text
- Main headline with optional highlight color
- Subtitle
- Primary CTA button (text + URL)
- Secondary CTA button (text + URL)
- Statistics (4 items: number + label)
- Background image

#### 2. About Section
- Headline with highlight
- Main description
- Secondary description
- Vision & Mission cards

#### 3. Services (List)
- Service name
- Description
- Icon (Lucide React icon name)
- Display order

#### 4. Partners (List)
- Partner name
- Logo image
- Website URL
- Display order

#### 5. Contact Information
- Email
- Phone number
- Address (optional)
- Contact section description

#### 6. Footer
- Company description
- LinkedIn URL
- Navigation sections with links
- Copyright text
- Branded tagline

#### 7. SEO Settings
- Page title
- Meta description
- OG image

#### 8. Projects (List)
- Title
- Description
- Project image
- Project URL
- Display order

#### 9. Team Members (List)
- Full name
- Role/position
- Biography
- Profile photo
- LinkedIn URL
- Display order

## Adding Client Access

### Invite a Client to Manage Content

1. Go to your Sanity project dashboard
2. Click on **Members** in the project settings
3. Click **Invite members**
4. Enter their email address
5. Select role: **Editor** (allows full content editing)
6. Send invitation

The client will receive an email with instructions to join the project and access the Studio.

## Automatic Publishing

After a client publishes changes in Sanity Studio:

1. The website automatically fetches the latest content
2. Changes appear within a few seconds (with CDN caching)
3. For production Vercel deployments, you may want to trigger a rebuild

### Setting Up Webhooks (Optional)

To trigger automatic rebuilds on Vercel when content changes:

1. Go to your Sanity project settings
2. Click **API** → **Webhooks**
3. Add a new webhook:
   - **URL**: Your Vercel deploy hook URL
   - **Trigger on**: "Create, update, delete"
   - **Filter**: Leave empty to trigger on all changes

4. Get your Vercel deploy hook:
   - Go to Vercel project settings
   - **Git** → **Deploy Hooks**
   - Create a new hook and copy the URL

## Troubleshooting

### Studio Won't Start
- Ensure `SANITY_STUDIO_PROJECT_ID` is set in `studio/.env.local`
- Run `cd studio && npm install` to ensure dependencies are installed

### Website Shows Default Content
- Check that `VITE_SANITY_PROJECT_ID` is set in root `.env.local`
- Ensure your Sanity project has content published
- Check browser console for errors

### Changes Not Appearing
- Publish the changes in Sanity Studio
- Wait a few seconds for CDN cache to refresh
- Try hard-refreshing the browser (Ctrl+Shift+R or Cmd+Shift+R)

## File Structure

```
.
├── studio/                 # Sanity Studio (separate app)
│   ├── schemaTypes/       # Content type definitions
│   ├── sanity.config.ts   # Studio configuration
│   ├── package.json       # Studio dependencies
│   └── README.md          # Studio setup guide
├── src/
│   ├── lib/
│   │   ├── sanityClient.ts   # Sanity client setup
│   │   ├── sanityTypes.ts    # TypeScript interfaces
│   │   └── sanityQueries.ts  # GROQ queries
│   ├── hooks/
│   │   └── useSanityContent.ts # React hook to fetch content
│   ├── data/
│   │   └── defaultContent.ts   # Fallback content
│   └── routes/index.tsx        # Main page using Sanity data
├── .env.example            # Environment variables template
└── package.json            # Root dependencies
```

## Next Steps

1. ✅ Create Sanity project
2. ✅ Get project credentials
3. ✅ Deploy Studio
4. ✅ Configure environment variables
5. ✅ Test content publishing
6. ✅ Invite client
7. ✅ Deploy to production

## Support

For Sanity documentation, visit:
- [Sanity Studio](https://www.sanity.io/docs/studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)
