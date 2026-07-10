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
const iconEntries = Object.entries(icons).filter(
  ([, value]) => value && typeof value.title === "string",
);
for (const name of names) {
  const matches = iconEntries
    .filter(([, icon]) => icon.title.toLowerCase().includes(name.toLowerCase()))
    .map(([, icon]) => icon.title)
    .slice(0, 20);
  console.log(name, matches.length ? matches : "NO MATCH");
}
