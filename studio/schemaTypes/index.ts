import {defineType, defineField, defineArrayMember} from 'sanity'

export const heroSchema = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow/Badge Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Highlighted Word in Title',
      type: 'string',
      description: 'Word to highlight in gradient color (e.g., "Next")'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'primaryCtaUrl',
      title: 'Primary CTA URL',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string'
    }),
    defineField({
      name: 'secondaryCtaUrl',
      title: 'Secondary CTA URL',
      type: 'string'
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          {name: 'number', type: 'string', title: 'Number'},
          {name: 'label', type: 'string', title: 'Label'}
        ]
      })]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image'
    })
  ]
})

export const aboutSchema = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Highlighted Phrase',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Main Description',
      type: 'text'
    }),
    defineField({
      name: 'descriptionSecondary',
      title: 'Secondary Description',
      type: 'text'
    }),
    defineField({
      name: 'cards',
      title: 'Cards (Vision & Mission)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Card Title'},
          {name: 'description', type: 'text', title: 'Card Description'}
        ]
      })]
    })
  ]
})

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide React)',
      type: 'string',
      description: 'e.g., Cloud, ShieldCheck, DatabaseBackup'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    })
  ]
})

export const partnerSchema = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image'
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    })
  ]
})

export const contactInfoSchema = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text'
    }),
    defineField({
      name: 'description',
      title: 'Contact Section Description',
      type: 'text'
    })
  ]
})

export const footerSchema = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text'
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      name: 'navSections',
      title: 'Navigation Sections',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Section Title'},
          {name: 'items', type: 'array', title: 'Links', of: [defineArrayMember({
            type: 'object',
            fields: [
              {name: 'label', type: 'string', title: 'Link Label'},
              {name: 'url', type: 'string', title: 'Link URL'}
            ]
          })]}
        ]
      })]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string'
    }),
    defineField({
      name: 'brandedTagline',
      title: 'Branded Tagline',
      type: 'string'
    })
  ]
})

export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text'
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image'
    })
  ]
})

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image'
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    })
  ]
})

export const teamSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string'
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text'
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image'
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    })
  ]
})
