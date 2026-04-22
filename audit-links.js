const https = require('https');
const http = require('http');

const extractLinks = (html) => {
  const links = new Set();
  const regex = /href="(https:\/\/atulautomation\.com\/[^"]*|\/[^"]*)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.add(match[1]);
  }
  return Array.from(links);
};

const fetchUrl = (urlStr) => {
  return new Promise((resolve) => {
    const protocol = urlStr.startsWith('https') ? https : http;
    protocol.get(urlStr, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://atulautomation.com' + loc;
        return fetchUrl(loc).then(resolve);
      }
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
};

const fetchHtml = (urlStr) => {
  return new Promise((resolve) => {
    const protocol = urlStr.startsWith('https') ? https : http;
    protocol.get(urlStr, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://atulautomation.com' + loc;
        return fetchHtml(loc).then(resolve);
      }
      let html = '';
      res.on('data', (c) => html += c);
      res.on('end', () => resolve(html));
    }).on('error', () => resolve(''));
  });
};

async function checkSite() {
  console.log('Fetching homepage to start link check...');
  const html = await fetchHtml('https://atulautomation.com');
  const links = extractLinks(html);
  
  // Also fetch sitemap
  console.log('Fetching sitemap...');
  const sitemapHtml = await fetchHtml('https://atulautomation.com/sitemap.xml');
  const sitemapLinks = extractLinks(sitemapHtml);
  
  const allUrlsRaw = [...new Set([...links, ...sitemapLinks])];
  const allUrls = allUrlsRaw.map(l => l.startsWith('/') ? 'https://atulautomation.com' + l : l);
  console.log(`Found ${allUrls.length} unique links to check.`);
  
  const results = { ok: [], broken: [], redirect: [] };
  
  const batchSize = 10;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    await Promise.all(batch.map(async (url) => {
      if (url.includes('.js') || url.includes('.css') || url.includes('.json')) return;
      const status = await fetchUrl(url);
      if (status >= 200 && status < 300) results.ok.push(url);
      else if (status >= 300 && status < 400) results.redirect.push(`${url} -> ${status}`);
      else results.broken.push(`${url} -> ${status}`);
    }));
    process.stdout.write(`\rChecked ${Math.min(i + batchSize, allUrls.length)}/${allUrls.length}...`);
  }
  
  console.log(`\n\n=== LINK AUDIT RESULTS ===`);
  console.log(`✅ OK: ${results.ok.length}`);
  console.log(`🔄 Redirects: ${results.redirect.length}`);
  console.log(`❌ Broken: ${results.broken.length}`);
  
  if (results.broken.length > 0) {
    console.log('Broken Links Details:');
    results.broken.forEach(l => console.log('  - ' + l));
  }
}

checkSite();
