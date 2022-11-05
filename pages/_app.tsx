import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      { /* Cloudflare Verfification Integration */ }
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy='lazyOnload' />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      { process.env.NEXT_PUBLIC_BUILD_TYPE?.toLowerCase() === "production" ?
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
      :
        null
      }

      { process.env.NEXT_PUBLIC_BUILD_TYPE?.toLowerCase() === "production" ?
        <Script id="google-analytics-script" strategy="lazyOnload">
          {
            `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `
          }
        </Script>
      :
        null
      }

      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp
