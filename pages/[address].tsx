import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import client from '../lib/client';

console.log('client', client);

interface GetInventoryParams {
  walletId: string;
}

interface Punks {
  walletId: string;
}

const InventoryPage: NextPage = () => {
  const [punks, setPunks] = useState([]);
  const router = useRouter();
  const walletId = router.query.address;
  useEffect(() => {
    if (walletId) {
      // @ts-ignore
      client.getInventory({ address: walletId }).then(data => {
        console.log('data', data);
        // @ts-ignore
        setPunks(data.punks);
      });
    }
  }, [walletId]);

  return (
    <div>
      <div>hello walletId: {walletId}</div>
      {punks.map(punk => (
        <Link key={punk.tokenId} href={`/detail/${punk.tokenId}`}>
          <div
            style={{ width: 150 }}
            dangerouslySetInnerHTML={{
              __html: punk.metadata.svg.replace('data:image/svg+xml;utf8,', ''),
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default InventoryPage;
