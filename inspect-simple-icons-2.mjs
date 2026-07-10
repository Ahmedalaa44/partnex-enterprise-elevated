import * as icons from "simple-icons";
const names = [
  "Microsoft",
  "Sophos",
  "ESET",
  "Acronis",
  "Commvault",
  "Adobe",
  "Aruba",
  "Hikvision",
];
const entries = Object.entries(icons).filter(
  ([, value]) => value && typeof value.title === "string",
);
for (const name of names) {
  const matches = entries
    .filter(
      ([, icon]) =>
        icon.title.toLowerCase().includes(name.toLowerCase()) ||
        icon.slug.toLowerCase().includes(name.toLowerCase()),
    )
    .map(([, icon]) => `${icon.title} -> ${icon.slug}`);
  console.log(name, matches.length ? matches : "NO MATCH");
}
