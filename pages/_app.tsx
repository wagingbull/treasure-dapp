import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Cryptopunks Viewer Dapp',
  projectId: '95833e24c29e3edede75a94f877130d1',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          ...darkTheme.accentColors.purple,
          borderRadius: 'medium',
          overlayBlur: 'small',
        })}
        modalSize="compact"
        chains={chains}
      >
        <MantineProvider theme={{ colorScheme: 'dark' }}>
          <Component {...pageProps} />
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
