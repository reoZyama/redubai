import Cors from 'cors';
import $axios from '@/libs/axiosConfig';
import { NextRequest, NextResponse } from 'next/server';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

export async function GET(req: NextRequest) {
  // Run the middleware
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
    throw error;
    // console.error('Error fetching weather data:', error);
    // return Response.json(
    //   { error: 'Failed to fetch weather data' },
    //   { status: 500 },
    // );
  }
}
