import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import cryptopunksData from '../../public/abis/cryptopunks.json';
import styles from '../../styles/Home.module.css';

interface DetailPageProps {
  detailId: number;
}

const DetailPage: NextPage<DetailPageProps> = () => {
  const router = useRouter();
  const detailId = Number(router.query.id);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const {
    data: svgData,
    isError: isSvgError,
    isLoading: isSvgLoading,
  } = useContractRead({
    address: `0x${contractAddress}`,
    abi: cryptopunksData,
    functionName: 'punkImageSvg',
    args: [detailId],
  });

  const {
    data: attributeData,
    isError: isAttributeError,
    isLoading: isAttributeLoading,
  } = useContractRead({
    address: `0x${contractAddress}`,
    abi: cryptopunksData,
    functionName: 'punkAttributes',
    args: [detailId],
  });

  const attributeArray: string[] = (attributeData as string)?.split(',');
  const renderedAttributes = attributeArray?.map((value, index) => (
    <div key={index}>{value}</div>
  ));

  const svgHtml =
    typeof svgData === 'string'
      ? svgData.replace('data:image/svg+xml;utf8,', '')
      : '';

  return (
    <div className={styles.grid}>
      {isSvgLoading || isAttributeLoading ? (
        <div>Loading cryptopunks data...</div>
      ) : (
        <>
          {isSvgError && (
            <div>Error loading SVG data for Cryptopunk ID: {detailId}</div>
          )}
          {isAttributeError && (
            <div>
              Error loading attribute data for Cryptopunk ID: {detailId}
            </div>
          )}
          {svgHtml ? (
            <div
              style={{ width: 250 }}
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          ) : (
            ''
          )}

          <div className={styles.card}>
            <h2>Cryptopunk {detailId} Attributes:</h2>
            {renderedAttributes}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
