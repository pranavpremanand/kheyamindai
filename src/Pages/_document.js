import Document, { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    let metaTags = '';
    
    try {
      // Read meta tags from the HTML file
      const metaTagsPath = path.join(process.cwd(), 'public', 'meta-tags.html');
      metaTags = fs.readFileSync(metaTagsPath, 'utf8');
    } catch (error) {
      console.error('Error reading meta tags:', error);
    }
    
    return { ...initialProps, metaTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Inject meta tags directly using dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{ __html: this.props.metaTags }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
