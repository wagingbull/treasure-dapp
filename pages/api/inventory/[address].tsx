import { GetInventoryQuery } from '../../../generated/app.generated';
import client from '../../../lib/client';

export default async function handler(
  req: { query: { address: any } },
  res: {
    status: (code: number) => any;
    json: (data: GetInventoryQuery | { error: string }) => any;
  }
) {
  try {
    const data = await client.getInventory({ address: req.query.address });
    console.log('try data', data);
    res.status(200).json(data);
  } catch (error) {
    console.log('try error', error);
    console.error('Error fetching inventory:', error);
    res.status(500).json(error);
  }
}
