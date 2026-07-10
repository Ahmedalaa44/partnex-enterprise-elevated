const fs = require("fs");
const path = require("path");
const icons = require("simple-icons");

const partners = [
  { fileName: "microsoft.svg", title: "Microsoft" },
  { fileName: "huawei-cloud.svg", title: "Huawei" },
  { fileName: "odoo.svg", title: "Odoo" },
  { fileName: "vmware.svg", title: "VMware" },
  { fileName: "fortinet.svg", title: "Fortinet" },
  { fileName: "sophos.svg", title: "Sophos" },
  { fileName: "kaspersky.svg", title: "Kaspersky" },
  { fileName: "eset.svg", title: "ESET" },
  { fileName: "veeam.svg", title: "Veeam" },
  { fileName: "acronis.svg", title: "Acronis" },
  { fileName: "commvault.svg", title: "Commvault" },
  { fileName: "veritas.svg", title: "Veritas" },
  { fileName: "adobe.svg", title: "Adobe" },
  { fileName: "autodesk.svg", title: "Autodesk" },
  { fileName: "hp.svg", title: "HP" },
  { fileName: "dell.svg", title: "Dell" },
  { fileName: "lenovo.svg", title: "Lenovo" },
  { fileName: "cisco.svg", title: "Cisco" },
  { fileName: "aruba.svg", title: "Aruba Networks" },
  { fileName: "hikvision.svg", title: "Hikvision" },
];

const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function findIcon(title) {
  const icon = Object.values(icons).find((item) => item && item.title === title);
  if (icon) return icon;
  return null;
}

partners.forEach((partner) => {
  const icon = findIcon(partner.title);
  if (!icon) {
    console.warn(`Missing Simple Icons asset for title: ${partner.title}`);
    return;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <title>${icon.title}</title>\n  ${icon.svg}\n</svg>`;
  const filePath = path.join(dir, partner.fileName);
  fs.writeFileSync(filePath, svg, "utf8");
  console.log("Wrote", filePath);
});
