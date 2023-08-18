import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export function Header() {
  const router = useRouter();
  const { address } = useAccount({
    onConnect() {
      router.push(`/wallet/${address}`);
    },
    onDisconnect() {
      router.push(`/`);
    },
  });

  return (
    <header>
      <div className={styles.headerContainer}>
        <Link href="/">
          <h1 className={styles.title}>Cryptopunks Viewer Dapp</h1>
        </Link>
        <Link href="/wallet/0x000000000000000000000000000000000000dead">
          Example Inventory
        </Link>
        <Link href="/detail/2317">Example Details</Link>
        <div className={styles.rightContent}>
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
}
