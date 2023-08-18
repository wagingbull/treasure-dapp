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
    console.log('Received request with address:', req.query.address);

    const data = await client.getInventory({ address: req.query.address });

    console.log('Data fetched from API:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching inventory:', error);

    res
      .status(500)
      .json({ error: 'An error occurred while fetching inventory' });
  }
}
