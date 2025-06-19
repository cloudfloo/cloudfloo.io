import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          <link rel="preload" as="image" href="/logo.avif" fetchPriority="high" />
          <link rel="preload" href="/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/InterVariable-Italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <style id="critical">{`#home{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}`}</style>
          <link
            rel="stylesheet"
            href="/styles.css"
            media="print"
            onLoad={(e) => {
              (e.currentTarget as HTMLLinkElement).media = 'all';
            }}
          />
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
