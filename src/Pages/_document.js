import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook - HARDCODED FOR RELIABILITY */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kheyamind.ai/" />
        <meta property="og:title" content="AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies" />
        <meta property="og:description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions." />
        <meta property="og:image" content="https://www.kheyamind.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="KheyaMind AI Technologies" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Chatbots, Voice Assistants & Automation Solutions | KheyaMind AI Technologies" />
        <meta name="twitter:description" content="KheyaMind AI crafts intelligent solutions including AI Chatbots, Voice Assistants, ERP Automations, and NLP tools. Empower your enterprise with next-gen AI solutions." />
        <meta name="twitter:image" content="https://www.kheyamind.ai/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
