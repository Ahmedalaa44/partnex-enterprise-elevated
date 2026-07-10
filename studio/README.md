# Sanity CMS Studio Setup

This folder contains the Sanity CMS Studio configuration for the Partnex website.

## Setup

1. Navigate to the studio folder:
   ```bash
   cd studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Sanity project credentials:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The Studio will be available at `http://localhost:3333`

## Environment Variables

- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID
- `SANITY_STUDIO_DATASET`: Dataset name (default: production)

## Deploying to Sanity Hosting

```bash
npm run deploy
```

## Content Collections

### Hero Section
- Eyebrow text
- Main title with optional highlight
- Description
- Call-to-action buttons
- Statistics
- Background image

### About Section
- Title with highlight
- Description
- Vision & Mission cards

### Services
- Title
- Description
- Icon name (Lucide React)
- Display order

### Partners
- Name
- Logo
- Website URL
- Display order

### Contact Information
- Email
- Phone
- Address
- Description

### Footer
- Company description
- LinkedIn URL
- Navigation sections with links
- Copyright text
- Branded tagline

### SEO Settings
- Page title
- Meta description
- OG image

### Projects
- Title
- Description
- Image
- URL
- Display order

### Team Members
- Name
- Role
- Bio
- Photo
- LinkedIn URL
- Display order

## Client Credentials

Share these credentials with your client for dashboard access:

**Login URL**: https://sanity.io/manage

To create an account for your client:
1. Go to your Sanity project settings
2. Navigate to Members
3. Invite them with their email
4. They'll receive an invitation to join your project
