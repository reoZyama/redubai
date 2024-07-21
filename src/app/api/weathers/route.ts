import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});
import $axios from '@/libs/axiosConfig';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { searchParams } = new URL(req.url as string);
  const q = searchParams.get('q');
  const url = `https://api.weatherapi.com/v1/current.json?q=${q}&key=${
    process.env.WEATHER_API_KEY
  }`;

  try {
    const response = await $axios.get(url);
    const weather = response.data;
    return Response.json({ weather });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return Response.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 },
    );
  }
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
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
  res: NextApiResponse,
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' });
}
