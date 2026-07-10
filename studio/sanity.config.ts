import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {
  heroSchema,
  aboutSchema,
  serviceSchema,
  partnerSchema,
  contactInfoSchema,
  footerSchema,
  seoSchema,
  projectSchema,
  teamSchema
} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'partnex_studio',
  title: 'Partnex Studio',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [
      heroSchema,
      aboutSchema,
      serviceSchema,
      partnerSchema,
      contactInfoSchema,
      footerSchema,
      seoSchema,
      projectSchema,
      teamSchema
    ],
  },
})
