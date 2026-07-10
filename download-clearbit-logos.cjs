const fs = require("fs");
const path = require("path");
const https = require("https");

const partners = [
  { fileName: "microsoft.svg", url: "https://logo.clearbit.com/microsoft.com?format=svg" },
  { fileName: "huawei-cloud.svg", url: "https://logo.clearbit.com/huawei.com?format=svg" },
  { fileName: "odoo.svg", url: "https://logo.clearbit.com/odoo.com?format=svg" },
  { fileName: "vmware.svg", url: "https://logo.clearbit.com/vmware.com?format=svg" },
  { fileName: "fortinet.svg", url: "https://logo.clearbit.com/fortinet.com?format=svg" },
  { fileName: "sophos.svg", url: "https://logo.clearbit.com/sophos.com?format=svg" },
  { fileName: "kaspersky.svg", url: "https://logo.clearbit.com/kaspersky.com?format=svg" },
  { fileName: "eset.svg", url: "https://logo.clearbit.com/eset.com?format=svg" },
  { fileName: "veeam.svg", url: "https://logo.clearbit.com/veeam.com?format=svg" },
  { fileName: "acronis.svg", url: "https://logo.clearbit.com/acronis.com?format=svg" },
  { fileName: "commvault.svg", url: "https://logo.clearbit.com/commvault.com?format=svg" },
  { fileName: "veritas.svg", url: "https://logo.clearbit.com/veritas.com?format=svg" },
  { fileName: "adobe.svg", url: "https://logo.clearbit.com/adobe.com?format=svg" },
  { fileName: "autodesk.svg", url: "https://logo.clearbit.com/autodesk.com?format=svg" },
  { fileName: "hp.svg", url: "https://logo.clearbit.com/hp.com?format=svg" },
  { fileName: "dell.svg", url: "https://logo.clearbit.com/dell.com?format=svg" },
  { fileName: "lenovo.svg", url: "https://logo.clearbit.com/lenovo.com?format=svg" },
  { fileName: "cisco.svg", url: "https://logo.clearbit.com/cisco.com?format=svg" },
  { fileName: "aruba.svg", url: "https://logo.clearbit.com/arubanetworks.com?format=svg" },
  { fileName: "hikvision.svg", url: "https://logo.clearbit.com/hikvision.com?format=svg" },
];

const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function download(url, filePath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } },
        (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location &&
            redirectCount < 5
          ) {
            return resolve(download(res.headers.location, filePath, redirectCount + 1));
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          const data = [];
          res.on("data", (chunk) => data.push(chunk));
          res.on("end", () => {
            fs.writeFileSync(filePath, Buffer.concat(data));
            resolve(filePath);
          });
        },
      )
      .on("error", reject);
  });
}

(async () => {
  for (const partner of partners) {
    const filePath = path.join(dir, partner.fileName);
    try {
      await download(partner.url, filePath);
      console.log("Downloaded", partner.fileName);
    } catch (error) {
      console.warn("Failed", partner.fileName, error.message);
    }
  }
})();
