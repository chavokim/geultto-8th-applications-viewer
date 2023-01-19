import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {Inter} from "@next/font/google";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>글또 지원서 검토용 사이트</title>
          <meta name="description" content="좀더 편하게 지원서를 검토할 수 있을지도?" />
            <meta property="og:title" content="글또 지원서 검토용 사이트" key={"og-title"} />
            <meta property="og:description" content="좀더 편하게 지원서를 검토할 수 있을지도?" key={"og-description"} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
        </div>
      </>
  )
}
