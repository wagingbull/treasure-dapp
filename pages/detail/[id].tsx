import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const DetailPage: NextPage = () => {
  const router = useRouter();
  const detailId = router.query.id;

  return <div>hello detail: {detailId}</div>;
};

export default DetailPage;
