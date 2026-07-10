const fs = require("fs");
const path = require("path");
const https = require("https");
const urls = {
  "microsoft.svg": "https://cdn.simpleicons.org/microsoft/ffffff",
  "huawei-cloud.svg": "https://cdn.simpleicons.org/huawei/ffffff",
  "odoo.svg": "https://cdn.simpleicons.org/odoo/ffffff",
  "vmware.svg": "https://cdn.simpleicons.org/vmware/ffffff",
  "fortinet.svg": "https://cdn.simpleicons.org/fortinet/ffffff",
  "sophos.svg": "https://cdn.simpleicons.org/sophos/ffffff",
  "kaspersky.svg": "https://cdn.simpleicons.org/kaspersky/ffffff",
  "eset.svg": "https://cdn.simpleicons.org/eset/ffffff",
  "veeam.svg": "https://cdn.simpleicons.org/veeam/ffffff",
  "acronis.svg": "https://cdn.simpleicons.org/acronis/ffffff",
  "commvault.svg": "https://cdn.simpleicons.org/commvault/ffffff",
  "veritas.svg": "https://cdn.simpleicons.org/veritas/ffffff",
  "adobe.svg": "https://cdn.simpleicons.org/adobe/ffffff",
  "autodesk.svg": "https://cdn.simpleicons.org/autodesk/ffffff",
  "hp.svg": "https://cdn.simpleicons.org/hp/ffffff",
  "dell.svg": "https://cdn.simpleicons.org/dell/ffffff",
  "lenovo.svg": "https://cdn.simpleicons.org/lenovo/ffffff",
  "cisco.svg": "https://cdn.simpleicons.org/cisco/ffffff",
  "aruba.svg": "https://cdn.simpleicons.org/aruba/ffffff",
  "hikvision.svg": "https://cdn.simpleicons.org/hikvision/ffffff",
};
const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(fileName, url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Accept: "image/svg+xml,image/*,*/*;q=0.8",
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            return reject(new Error(`Failed to download ${fileName}: ${res.statusCode}`));
          }
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            const buffer = Buffer.concat(chunks);
            const filePath = path.join(dir, fileName);
            fs.writeFile(filePath, buffer, (err) => {
              if (err) return reject(err);
              resolve(filePath);
            });
          });
        },
      )
      .on("error", reject);
  });
}

(async () => {
  const entries = Object.entries(urls);
  for (const [fileName, url] of entries) {
    try {
      const filePath = await downloadFile(fileName, url);
      console.log("Downloaded", filePath);
    } catch (error) {
      console.error("Error downloading", fileName, error.message);
    }
  }
})();
