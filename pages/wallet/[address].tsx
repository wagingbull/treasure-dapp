import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import client from '../../lib/client';
import styles from '../../styles/Home.module.css';

interface CryptoPunk {
  tokenId: string;
  metadata: {
    svg: string;
    traits: { id: string }[];
  };
}

interface GetInventoryQuery {
  address: string;
}

interface GetInventoryResponse {
  punks: CryptoPunk[];
}

const InventoryPage: NextPage = () => {
  const [punks, setPunks] = useState<CryptoPunk[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const walletId = router.query.address as string | undefined;

  const isValidETHAddress = (value: string): boolean => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(value);
  };

  useEffect(() => {
    if (!walletId || !isValidETHAddress(walletId)) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const query: GetInventoryQuery = {
      address: walletId,
    };

    // @ts-ignore GetInventoryResponse type
    client.getInventory(query).then((data: GetInventoryResponse) => {
      setPunks(data.punks);
      setLoading(false);
    });
  }, [walletId]);

  return (
    <div className={styles.grid}>
      {loading ? (
        <p>Loading Cryptopunks...</p>
      ) : punks.length === 0 ? (
        <p>No Cryptopunks available for wallet: {walletId}.</p>
      ) : (
        <div>
          {punks.map(punk => (
            <Link
              key={punk.tokenId}
              href={`/detail/${punk.tokenId}`}
              className={styles.card}
            >
              <div style={{ width: 150 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: punk.metadata.svg.replace(
                      'data:image/svg+xml;utf8,',
                      ''
                    ),
                  }}
                />
                {punk.metadata.traits.map(trait => (
                  <div key={trait.id}>{trait.id}</div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
