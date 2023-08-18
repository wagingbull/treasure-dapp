import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import punksABI from './punksABI.json';

const DetailPage: NextPage = () => {
  const router = useRouter();
  const detailId = Number(router.query.id);

  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: punksABI,
    functionName: 'punkImageSvg',
    args: [detailId],
  });

  const svgContent = data?.replace('data:image/svg+xml;utf8,', '');

  return (
    <div>
      <div>hello detail: {detailId}</div>
      <div
        style={{ width: 250 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default DetailPage;
