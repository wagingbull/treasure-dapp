import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import cryptopunksData from '../../public/abis/cryptopunks.json';

interface DetailPageProps {
  detailId: number;
}

const DetailPage: NextPage<DetailPageProps> = () => {
  const router = useRouter();
  const detailId = Number(router.query.id) as number;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { data, isError, isLoading } = useContractRead({
    address: `0x${contractAddress}`,
    abi: cryptopunksData,
    functionName: 'punkImageSvg',
    args: [detailId],
  });

  const svgHtml =
    typeof data === 'string'
      ? data.replace('data:image/svg+xml;utf8,', '')
      : '';

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data for Cryptopunk ID: {detailId}</div>}
      {svgHtml ? (
        <div
          style={{ width: 250 }}
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : (
        <div>No SVG data available</div>
      )}
    </div>
  );
};

export default DetailPage;
