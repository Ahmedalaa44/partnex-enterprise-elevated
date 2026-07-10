const fs = require("fs");
const path = require("path");
const https = require("https");

const partners = [
  { fileName: "microsoft.svg", slugs: ["microsoft"] },
  { fileName: "huawei-cloud.svg", slugs: ["huawei-cloud", "huawei"] },
  { fileName: "odoo.svg", slugs: ["odoo"] },
  { fileName: "vmware.svg", slugs: ["vmware"] },
  { fileName: "fortinet.svg", slugs: ["fortinet"] },
  { fileName: "sophos.svg", slugs: ["sophos"] },
  { fileName: "kaspersky.svg", slugs: ["kaspersky"] },
  { fileName: "eset.svg", slugs: ["eset"] },
  { fileName: "veeam.svg", slugs: ["veeam"] },
  { fileName: "acronis.svg", slugs: ["acronis"] },
  { fileName: "commvault.svg", slugs: ["commvault"] },
  { fileName: "veritas.svg", slugs: ["veritas"] },
  { fileName: "adobe.svg", slugs: ["adobe"] },
  { fileName: "autodesk.svg", slugs: ["autodesk"] },
  { fileName: "hp.svg", slugs: ["hp"] },
  { fileName: "dell.svg", slugs: ["dell"] },
  { fileName: "lenovo.svg", slugs: ["lenovo"] },
  { fileName: "cisco.svg", slugs: ["cisco"] },
  { fileName: "aruba.svg", slugs: ["aruba"] },
  { fileName: "hikvision.svg", slugs: ["hikvision"] },
];

const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        const status = res.statusCode;
        if (status >= 300 && status < 400 && res.headers.location) {
          return resolve(download(res.headers.location));
        }
        if (status !== 200) {
          res.resume();
          return resolve({ status, body: null });
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve({ status, body: Buffer.concat(chunks) }));
      })
      .on("error", (error) => reject(error));
  });
}

(async () => {
  for (const partner of partners) {
    let saved = false;
    for (const slug of partner.slugs) {
      const url = `https://cdn.simpleicons.org/${slug}`;
      try {
        const { status, body } = await download(url);
        if (status === 200 && body) {
          const filePath = path.join(dir, partner.fileName);
          fs.writeFileSync(filePath, body);
          console.log(`Saved ${partner.fileName} from ${url}`);
          saved = true;
          break;
        }
        console.log(`Skipped ${slug} (${status}) for ${partner.fileName}`);
      } catch (error) {
        console.warn(`Error fetching ${url}:`, error.message);
      }
    }
    if (!saved) {
      console.warn(`No simple-icons SVG found for ${partner.fileName}`);
    }
  }
})();
