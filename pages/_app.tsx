import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'
import '@fontsource/fira-code'
import "@fontsource/inter"
import { NextSeo } from 'next-seo'
import Head from "next/head"
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
      <NextSeo
        title="NFTank"
        titleTemplate="NFTank"
        defaultTitle="NFTank"
        description="NFTank (NFT tank for dummies) will allow developers to quickly request NFTs to personal wallets or smart contracts in just a few clicks."
        canonical="https://nftank.xyz"
        openGraph={{
          url: 'https://nftank.xyz',
          title: 'NFTanj',
          description:
            'NFTank (NFT tank for dummies) will allow developers to quickly request NFTs to personal wallets or smart contracts in just a few clicks.',
          images: [
            {
              url: `/og-image.png`,
              width: 800,
              height: 420,
              alt: 'og image',
            },
          ],
        }}
        twitter={{
          handle: '@buidlershub',
          site: '@buidlershub',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <link rel="icon" href="/assets/logo.png" type="image/png" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
        <Toaster />
      </RecoilRoot>
    </>
  )
}

export default MyApp
