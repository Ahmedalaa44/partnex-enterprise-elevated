const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const files = {
  "microsoft.svg": { label: "Microsoft", color: "#00A4EF" },
  "huawei-cloud.svg": { label: "Huawei Cloud", color: "#FF0000" },
  "odoo.svg": { label: "Odoo", color: "#674EA7" },
  "vmware.svg": { label: "VMware", color: "#607D8B" },
  "fortinet.svg": { label: "Fortinet", color: "#E2231A" },
  "sophos.svg": { label: "Sophos", color: "#0D5EBB" },
  "kaspersky.svg": { label: "Kaspersky", color: "#00A650" },
  "eset.svg": { label: "ESET", color: "#2B7BB9" },
  "veeam.svg": { label: "Veeam", color: "#00A859" },
  "acronis.svg": { label: "Acronis", color: "#008C95" },
  "commvault.svg": { label: "Commvault", color: "#0187CE" },
  "veritas.svg": { label: "Veritas", color: "#4B9E3B" },
  "adobe.svg": { label: "Adobe", color: "#FF0000" },
  "autodesk.svg": { label: "Autodesk", color: "#0B5FA0" },
  "hp.svg": { label: "HP", color: "#0096D6" },
  "dell.svg": { label: "Dell", color: "#0076CE" },
  "lenovo.svg": { label: "Lenovo", color: "#EA001B" },
  "cisco.svg": { label: "Cisco", color: "#1CA0DF" },
  "aruba.svg": { label: "Aruba", color: "#0072CE" },
  "hikvision.svg": { label: "Hikvision", color: "#E1162D" },
};
for (const [fileName, info] of Object.entries(files)) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120">\n  <defs>\n    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">\n      <stop offset="0%" stop-color="${info.color}"/>\n      <stop offset="100%" stop-color="#111111"/>\n    </linearGradient>\n  </defs>\n  <rect width="400" height="120" rx="24" fill="url(#g)"/>\n  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="32" fill="#ffffff" font-weight="700">${info.label}</text>\n</svg>`;
  fs.writeFileSync(path.join(dir, fileName), svg, "utf8");
}
console.log("Generated partner logo SVG placeholders:", Object.keys(files).length);
