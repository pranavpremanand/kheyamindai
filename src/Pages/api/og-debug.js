export default function handler(req, res) {
  // Set HTTP response headers to ensure no caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // HTML with debugging info
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>OG Debug</title>
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://www.kheyamind.ai/">
      <meta property="og:title" content="AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies">
      <meta property="og:description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions.">
      <meta property="og:image" content="https://www.kheyamind.ai/og-image.png">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:site_name" content="KheyaMind AI Technologies">
    </head>
    <body>
      <h1>OG Debug Page</h1>
      <p>This is a test page for OG tags.</p>
      <p>Current time: ${new Date().toISOString()}</p>
      <p>Image URL: <a href="https://www.kheyamind.ai/og-image.png">https://www.kheyamind.ai/og-image.png</a></p>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
