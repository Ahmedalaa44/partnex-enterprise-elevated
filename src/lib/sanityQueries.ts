export const homePageQuery = `
{
  "hero": *[_type == "heroSection"][0]{
    eyebrow,
    title,
    titleHighlight,
    description,
    primaryCtaText,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
    stats[]{number, label},
    backgroundImage
  },
  "about": *[_type == "aboutSection"][0]{
    eyebrow,
    title,
    titleHighlight,
    description,
    descriptionSecondary,
    cards[]{title, description}
  },
  "services": *[_type == "service"] | order(order asc){
    icon,
    title,
    desc
  },
  "partners": *[_type == "partner"] | order(order asc){
    name,
    website,
    logo
  },
  "projects": *[_type == "project"] | order(order asc){
    title,
    description,
    url,
    image
  },
  "team": *[_type == "teamMember"] | order(order asc){
    name,
    role,
    bio,
    linkedIn,
    photo
  },
  "contactInfo": *[_type == "contactInfo"][0]{
    email,
    phone,
    address,
    description
  },
  "footer": *[_type == "footer"][0]{
    companyDescription,
    linkedinUrl,
    navSections[]{title, items[]{label, url}},
    copyrightText,
    brandedTagline
  },
  "seo": *[_type == "seo"][0]{
    title,
    description,
    ogImage
  }
}`;
