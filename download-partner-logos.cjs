const fs = require('fs');
const path = require('path');
const https = require('https');
const urls = {
  'microsoft.svg': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'huawei-cloud.svg': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Huawei_2018_logo.svg',
  'odoo.svg': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Odoo_logo.svg',
  'vmware.svg': 'https://upload.wikimedia.org/wikipedia/commons/9/94/VMware_Logo.svg',
  'fortinet.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Fortinet_logo.svg',
  'sophos.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Sophos_logo.svg',
  'kaspersky.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Kaspersky_logo.svg',
  'eset.svg': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Eset_logo.svg',
  'veeam.svg': 'https://upload.wikimedia.org/wikipedia/commons/2/26/Veeam_logo.svg',
  'acronis.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Acronis_Logo.png',
  'commvault.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Commvault_logo.svg',
  'veritas.svg': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Veritas_Technologies_Logo.svg',
  'adobe.svg': 'https://upload.wikimedia.org/wikipedia/commons/8/80/Adobe_logo.svg',
  'autodesk.svg': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Autodesk_logo.svg',
  'hp.svg': 'https://upload.wikimedia.org/wikipedia/commons/3/32/HP_logo_2012.svg',
  'dell.svg': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
  'lenovo.svg': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Lenovo_logo.svg',
  'cisco.svg': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Cisco_logo.svg',
  'aruba.svg': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Aruba_Networks_logo.svg',
  'hikvision.svg': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Hikvision_Logo.svg',
};
const dir = path.join(__dirname, 'src', 'assets', 'partner-logos');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(fileName, url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/svg+xml,image/*,*/*;q=0.8',
      },
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${fileName}: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const filePath = path.join(dir, fileName);
        fs.writeFile(filePath, buffer, (err) => {
          if (err) return reject(err);
          resolve(filePath);
        });
      });
    }).on('error', reject);
  });
}

(async () => {
  const entries = Object.entries(urls);
  for (const [fileName, url] of entries) {
    try {
      const filePath = await downloadFile(fileName, url);
      console.log('Downloaded', filePath);
    } catch (error) {
      console.error('Error downloading', fileName, error.message);
    }
  }
})();
