import * as icons from 'simple-icons';
const names = ['Microsoft', 'Sophos', 'ESET', 'Acronis', 'Commvault', 'Adobe', 'Aruba', 'Hikvision'];
const entries = Object.values(icons).filter((icon) => icon && typeof icon.title === 'string');
for (const name of names) {
  const matches = entries
    .filter((icon) => icon.title.toLowerCase().includes(name.toLowerCase()) || icon.slug.toLowerCase().includes(name.toLowerCase()))
    .map((icon) => ({ title: icon.title, slug: icon.slug }));
  console.log(name, matches.length ? matches : 'NO MATCH');
}
