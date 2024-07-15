import { NextRequest } from 'next/server';
import $axios from '@/libs/axiosConfig';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const url = `https://api.weatherapi.com/v1/current.json?q=${q}&key=${
    process.env.NEXT_PUBLIC_WEATHER_API_KEY
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
