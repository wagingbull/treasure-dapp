import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const InventoryPage: NextPage = () => {
  const router = useRouter();
  const walletId = router.query.id;
  return <div>hello walletId: {walletId}</div>;
};

export default InventoryPage;
