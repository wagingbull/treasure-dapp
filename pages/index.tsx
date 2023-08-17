import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AccountForm } from '../components/account-form';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptopunks Viewer Dapp</title>
        <meta content="Cryptopunks Viewer dapp" name="description" />
        <link href="/favicon.png" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton showBalance={false} />

        <h1 className={styles.title}>Cryptopunks Viewer Dapp</h1>

        <AccountForm />

        <div className={styles.grid}>
          <a className={styles.card} href="#">
            <h2>Inventory Page &rarr;</h2>
            <p>
              Allows a user to connect their wallet to the application or
              manually input a wallet address in a text input field Displays the
              Cryptopunk token IDs owned by the provided wallet address Clicking
              on any of the token IDs directs the user to the Details Page
            </p>
          </a>

          <a className={styles.card} href="#">
            <h2>Details Page &rarr;</h2>
            <p>
              Given a Cryptopunks token ID, the Details Page displays the image
              and attribute associated with that token.
            </p>
          </a>
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

export default Home;
