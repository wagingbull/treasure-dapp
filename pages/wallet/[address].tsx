import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import client from '../../lib/client';
import { Card, Container, Grid } from '@mantine/core';

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
  const loadingMessage = 'Loading Cryptopunks...';
  const emptyMessage = `No Cryptopunks available for wallet: ${walletId}.`;
  const titleMessage = `Cryptopunks Inventory for ${walletId}:`;

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
    <Container size="xs" px="xs">
      {loading ? (
        <p>{loadingMessage}</p>
      ) : punks.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <Grid gutter="lg">
          <h2>{titleMessage}</h2>
          {punks.map(punk => (
            <Link key={punk.tokenId} href={`/detail/${punk.tokenId}`}>
              <Card mx="xl">
                <div
                  style={{ width: 150 }}
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
              </Card>
            </Link>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default InventoryPage;
