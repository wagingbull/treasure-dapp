import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import cryptopunksData from '../../public/abis/cryptopunks.json';
import { Card, Container } from '@mantine/core';

interface DetailPageProps {
  detailId: number;
}

const DetailPage: NextPage<DetailPageProps> = () => {
  const router = useRouter();
  const detailId = Number(router.query.id);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const loadingMessage = 'Loading Cryptopunk attributes...';
  const svgErrorMessage = `Error loading SVG data for Cryptopunk ID: ${detailId}`;
  const attributesErrorMessage = `Error loading attribute data for Cryptopunk ID: ${detailId}`;
  const titleMessage = `Cryptopunk ${detailId} Attributes:`;

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
    <Container size="xs" px="xs">
      {isSvgLoading || isAttributeLoading ? (
        <div>{loadingMessage}</div>
      ) : (
        <>
          {isSvgError && <div>{svgErrorMessage}</div>}
          {isAttributeError && <div>{attributesErrorMessage}</div>}
          {!isAttributeError ||
            (!isSvgError && (
              <Card>
                {svgHtml ? (
                  <div
                    style={{ width: 250 }}
                    dangerouslySetInnerHTML={{ __html: svgHtml }}
                  />
                ) : (
                  ''
                )}

                <h2>{titleMessage}</h2>
                {renderedAttributes}
              </Card>
            ))}
        </>
      )}
    </Container>
  );
};

export default DetailPage;
