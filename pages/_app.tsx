import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { getInitialPreloadedQuery, getRelayProps } from 'relay-nextjs/app'
import { createEmotionCache, theme } from '../context/theme'
import { getClientEnvironment } from '../environment/client'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const clientEnv = getClientEnvironment()
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const relayProps = getRelayProps(pageProps, initialPreloadedQuery)
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <RelayEnvironmentProvider environment={env}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </CacheProvider>
  )
}
