import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import client from '../../../lib/client';
import fallbackData from './fallbackData.json';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors);
    console.log('Received request with address:', req.query.address);

    // Check if req.query.address is a valid string
    const address =
      typeof req.query.address === 'string' ? req.query.address : '';

    // Construct the full URL
    const baseUrl = process.env.NEXT_PUBLIC_CRYPTOPUNKS_API_URL;
    const endpoint = `/api/inventory/${address}`;
    const apiUrl = `${baseUrl}${endpoint}`;

    // Fetch data from the GraphQL client
    const data = await client.getInventory({ address: apiUrl });
    console.log('Data fetched from API:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching inventory; using fallback data', error);

    res.status(500).json(fallbackData);
  }
}
