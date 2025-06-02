/**
 * Performance Testing Script
 * Automated performance testing and reporting
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Performance thresholds
const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  bestPractices: 90,
  seo: 95,
  lcp: 2500,
  fid: 100,
  cls: 0.1
};

// URLs to test
const TEST_URLS = [
  'http://localhost:3000',
  'http://localhost:3000/services',
  'http://localhost:3000/services/ai-chatbots',
  'http://localhost:3000/about-us',
  'http://localhost:3000/contact-us'
];

async function runLighthouse(url, options = {}) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const config = {
    extends: 'lighthouse:default',
    settings: {
      formFactor: options.mobile ? 'mobile' : 'desktop',
      throttling: options.mobile ? 
        lighthouse.constants.throttling.mobileSlow4G : 
        lighthouse.constants.throttling.desktopDense4G,
      screenEmulation: options.mobile ? 
        lighthouse.constants.screenEmulationMetrics.mobile : 
        lighthouse.constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: options.mobile ? 
        lighthouse.constants.userAgents.mobile : 
        lighthouse.constants.userAgents.desktop,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
    }
  };

  const runnerResult = await lighthouse(url, {
    port: chrome.port,
    disableDeviceEmulation: !options.mobile,
    chromeFlags: ['--disable-mobile-emulation']
  }, config);

  await chrome.kill();
  return runnerResult;
}

async function analyzeResults(results, url, device) {
  const { lhr } = results;
  const scores = {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100)
  };

  // Core Web Vitals
  const metrics = {
    lcp: lhr.audits['largest-contentful-paint'].numericValue,
    fid: lhr.audits['max-potential-fid'].numericValue,
    cls: lhr.audits['cumulative-layout-shift'].numericValue
  };

  // Check if thresholds are met
  const passed = {
    performance: scores.performance >= THRESHOLDS.performance,
    accessibility: scores.accessibility >= THRESHOLDS.accessibility,
    bestPractices: scores.bestPractices >= THRESHOLDS.bestPractices,
    seo: scores.seo >= THRESHOLDS.seo,
    lcp: metrics.lcp <= THRESHOLDS.lcp,
    fid: metrics.fid <= THRESHOLDS.fid,
    cls: metrics.cls <= THRESHOLDS.cls
  };

  return {
    url,
    device,
    scores,
    metrics,
    passed,
    timestamp: new Date().toISOString()
  };
}

async function generateReport(results) {
  const reportPath = path.join(__dirname, '..', 'performance-report.json');
  const htmlReportPath = path.join(__dirname, '..', 'performance-report.html');

  // Save JSON report
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  // Generate HTML report
  const htmlReport = generateHTMLReport(results);
  fs.writeFileSync(htmlReportPath, htmlReport);

  console.log(`Performance report saved to: ${reportPath}`);
  console.log(`HTML report saved to: ${htmlReportPath}`);
}

function generateHTMLReport(results) {
  const timestamp = new Date().toLocaleString();
  
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Report - KheyaMind AI</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; margin: 10px 0; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .url-section { margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
        .url-header { background: #007bff; color: white; padding: 15px; font-weight: bold; }
        .device-results { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
        .device-card { border: 1px solid #eee; border-radius: 4px; padding: 15px; }
        .scores { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 15px; }
        .score { text-align: center; padding: 10px; border-radius: 4px; background: #f8f9fa; }
        .vitals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .vital { text-align: center; padding: 10px; border-radius: 4px; background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Performance Report</h1>
            <p>Generated on: ${timestamp}</p>
        </div>
`;

  // Overall summary
  const allResults = results.flat();
  const avgScores = {
    performance: Math.round(allResults.reduce((sum, r) => sum + r.scores.performance, 0) / allResults.length),
    accessibility: Math.round(allResults.reduce((sum, r) => sum + r.scores.accessibility, 0) / allResults.length),
    bestPractices: Math.round(allResults.reduce((sum, r) => sum + r.scores.bestPractices, 0) / allResults.length),
    seo: Math.round(allResults.reduce((sum, r) => sum + r.scores.seo, 0) / allResults.length)
  };

  html += `
        <div class="summary">
            <div class="metric-card">
                <h3>Performance</h3>
                <div class="metric-value ${avgScores.performance >= THRESHOLDS.performance ? 'passed' : 'failed'}">${avgScores.performance}</div>
                <div>Target: ${THRESHOLDS.performance}+</div>
            </div>
            <div class="metric-card">
                <h3>Accessibility</h3>
                <div class="metric-value ${avgScores.accessibility >= THRESHOLDS.accessibility ? 'passed' : 'failed'}">${avgScores.accessibility}</div>
                <div>Target: ${THRESHOLDS.accessibility}+</div>
            </div>
            <div class="metric-card">
                <h3>Best Practices</h3>
                <div class="metric-value ${avgScores.bestPractices >= THRESHOLDS.bestPractices ? 'passed' : 'failed'}">${avgScores.bestPractices}</div>
                <div>Target: ${THRESHOLDS.bestPractices}+</div>
            </div>
            <div class="metric-card">
                <h3>SEO</h3>
                <div class="metric-value ${avgScores.seo >= THRESHOLDS.seo ? 'passed' : 'failed'}">${avgScores.seo}</div>
                <div>Target: ${THRESHOLDS.seo}+</div>
            </div>
        </div>
`;

  // Detailed results by URL
  const groupedResults = {};
  allResults.forEach(result => {
    if (!groupedResults[result.url]) {
      groupedResults[result.url] = {};
    }
    groupedResults[result.url][result.device] = result;
  });

  Object.entries(groupedResults).forEach(([url, devices]) => {
    html += `
        <div class="url-section">
            <div class="url-header">${url}</div>
            <div class="device-results">
`;

    Object.entries(devices).forEach(([device, result]) => {
      html += `
                <div class="device-card">
                    <h4>${device.toUpperCase()}</h4>
                    <div class="scores">
                        <div class="score">
                            <div class="${result.passed.performance ? 'passed' : 'failed'}">${result.scores.performance}</div>
                            <div>Performance</div>
                        </div>
                        <div class="score">
                            <div class="${result.passed.accessibility ? 'passed' : 'failed'}">${result.scores.accessibility}</div>
                            <div>Accessibility</div>
                        </div>
                        <div class="score">
                            <div class="${result.passed.bestPractices ? 'passed' : 'failed'}">${result.scores.bestPractices}</div>
                            <div>Best Practices</div>
                        </div>
                        <div class="score">
                            <div class="${result.passed.seo ? 'passed' : 'failed'}">${result.scores.seo}</div>
                            <div>SEO</div>
                        </div>
                    </div>
                    <div class="vitals">
                        <div class="vital">
                            <div class="${result.passed.lcp ? 'passed' : 'failed'}">${Math.round(result.metrics.lcp)}ms</div>
                            <div>LCP</div>
                        </div>
                        <div class="vital">
                            <div class="${result.passed.fid ? 'passed' : 'failed'}">${Math.round(result.metrics.fid)}ms</div>
                            <div>FID</div>
                        </div>
                        <div class="vital">
                            <div class="${result.passed.cls ? 'passed' : 'failed'}">${result.metrics.cls.toFixed(3)}</div>
                            <div>CLS</div>
                        </div>
                    </div>
                </div>
`;
    });

    html += `
            </div>
        </div>
`;
  });

  html += `
    </div>
</body>
</html>
`;

  return html;
}

async function runPerformanceTests() {
  console.log('Starting performance tests...');
  const results = [];

  for (const url of TEST_URLS) {
    console.log(`Testing ${url}...`);
    
    try {
      // Test mobile
      console.log('  - Mobile test...');
      const mobileResult = await runLighthouse(url, { mobile: true });
      const mobileAnalysis = await analyzeResults(mobileResult, url, 'mobile');
      results.push(mobileAnalysis);

      // Test desktop
      console.log('  - Desktop test...');
      const desktopResult = await runLighthouse(url, { mobile: false });
      const desktopAnalysis = await analyzeResults(desktopResult, url, 'desktop');
      results.push(desktopAnalysis);

    } catch (error) {
      console.error(`Error testing ${url}:`, error.message);
    }
  }

  await generateReport(results);
  
  // Print summary
  console.log('\n=== Performance Test Summary ===');
  results.forEach(result => {
    const status = Object.values(result.passed).every(Boolean) ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.url} (${result.device}): Performance ${result.scores.performance}/100`);
  });

  return results;
}

// Run tests if called directly
if (require.main === module) {
  runPerformanceTests()
    .then(() => {
      console.log('\nPerformance tests completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Performance tests failed:', error);
      process.exit(1);
    });
}

module.exports = { runPerformanceTests, THRESHOLDS };