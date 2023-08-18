import { GetInventoryQuery } from '../../../generated/app.generated';
import client from '../../../lib/client';

export default async function handler(
  req: { query: { address: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: GetInventoryQuery): void; new (): any };
    };
  }
) {
  const data = await client.getInventory({ address: req.query.address });

  res.status(200).json(data);
}
