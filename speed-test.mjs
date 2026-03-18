export async function getPageSpeed(url) {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;
    
    try {
        console.log(`Analyzing ${url} via Google PageSpeed Insights (Mobile)... this takes ~15 seconds.`);
        const response = await fetch(api);
        const data = await response.json();
        
        if (data.error) {
            console.error("API Error:", data.error.message);
            return;
        }

        const categories = data.lighthouseResult.categories;
        const metrics = data.lighthouseResult.audits;

        console.log("\n===========================================");
        console.log(`📊 LIGHTHOUSE SCORE FOR: ${url}`);
        console.log("===========================================");
        
        console.log(`🚀 Performance:   ${Math.round(categories.performance.score * 100)} / 100`);
        console.log(`♿ Accessibility: ${Math.round(categories.accessibility.score * 100)} / 100`);
        console.log(`💡 Best Practices:${Math.round(categories['best-practices'].score * 100)} / 100`);
        console.log(`🔎 SEO:           ${Math.round(categories.seo.score * 100)} / 100`);
        
        console.log("\n⏳ Core Web Vitals (Mobile):");
        console.log(`- First Contentful Paint: ${metrics['first-contentful-paint'].displayValue}`);
        console.log(`- Largest Contentful Paint: ${metrics['largest-contentful-paint'].displayValue}`);
        console.log(`- Total Blocking Time: ${metrics['total-blocking-time'].displayValue}`);
        console.log(`- Speed Index: ${metrics['speed-index'].displayValue}`);
        
        console.log("===========================================\n");
    } catch (e) {
        console.error("Failed to analyze:", e.message);
    }
}

getPageSpeed("https://atulautomation.com");
