import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AccountForm } from '../components/AccountForm/AccountForm';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Center } from '@mantine/core';
import Link from 'next/link';

const HomePage: NextPage = () => {
  const { address, isConnected } = useAccount({
    onConnect() {},
    onDisconnect() {},
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptopunks Viewer Dapp</title>
        <meta content="Cryptopunks Viewer dapp" name="description" />
        <link href="/favicon.png" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cryptopunks Viewer Dapp</h1>

        <ConnectButton showBalance={false} />
        {isConnected && <div>{address}</div>}

        {!isConnected && (
          <div>
            <Center mx="auto">
              <h3>- OR -</h3>
            </Center>
            <AccountForm title="Enter wallet address to view Cryptopunks inventory" />
          </div>
        )}

        <div className={styles.grid}>
          <Link
            className={styles.card}
            href="/0x0000000000000000000000000000000000000000"
          >
            <h2>Inventory Page &rarr;</h2>
            <p>
              Allows a user to connect their wallet to the application or
              manually input a wallet address in a text input field Displays the
              Cryptopunk token IDs owned by the provided wallet address Clicking
              on any of the token IDs directs the user to the Details Page
            </p>
          </Link>

          <Link className={styles.card} href="/detail/7755">
            <h2>Details Page &rarr;</h2>
            <p>
              Given a Cryptopunks token ID, the Details Page displays the image
              and attribute associated with that token.
            </p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Created by{' '}
          <a href="https://linktr.ee/wagingbull" target="_new">
            wagingbull
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
