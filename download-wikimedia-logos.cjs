const fs = require("fs");
const path = require("path");
const https = require("https");

const candidates = {
  "microsoft.svg": ["Microsoft_logo.svg", "Microsoft_Logo.svg"],
  "sophos.svg": ["Sophos_logo.svg", "Sophos_Logo.svg"],
  "eset.svg": ["ESET_logo.svg", "ESET_Logo.svg", "Eset_logo.svg"],
  "acronis.svg": ["Acronis_logo.svg", "Acronis_Logo.svg"],
  "commvault.svg": ["Commvault_logo.svg", "Commvault_Logo.svg"],
  "adobe.svg": ["Adobe_logo.svg", "Adobe_Logo.svg"],
  "aruba.svg": ["Aruba_Networks_logo.svg", "Aruba_logo.svg", "Aruba_Logo.svg"],
  "hikvision.svg": ["Hikvision_logo.svg", "Hikvision_Logo.svg"],
};
const dir = path.join(__dirname, "src", "assets", "partner-logos");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        },
        (res) => {
          const status = res.statusCode;
          if (status !== 200) {
            res.resume();
            return resolve({ status, body: null });
          }
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => resolve({ status, body: Buffer.concat(chunks) }));
        },
      )
      .on("error", (err) => reject(err));
  });
}

(async () => {
  for (const [fileName, names] of Object.entries(candidates)) {
    let saved = false;
    for (const file of names) {
      const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
      try {
        const { status, body } = await downloadUrl(url);
        if (status === 200 && body) {
          const filePath = path.join(dir, fileName);
          fs.writeFileSync(filePath, body);
          console.log("Saved", fileName, "from", file);
          saved = true;
          break;
        }
      } catch (error) {
        console.warn("Error fetching", url, error.message);
      }
    }
    if (!saved) {
      console.warn("No file found for", fileName);
    }
  }
})();
