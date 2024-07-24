import Cors from 'cors';
import $axios from '@/libs/axiosConfig';
import { NextRequest, NextResponse } from 'next/server';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // OPTONSを追加
  'Access-Control-Allow-Headers': 'Content-Type', // 追加
};

export async function GET(req: NextRequest, res: NextResponse) {
  // Run the middleware
  const { searchParams } = new URL(req.url as string);
  const q = searchParams.get('q');
  const url = `https://api.weatherapi.com/v1/current.json?q=${q}&key=${
    process.env.WEATHER_API_KEY
  }`;

  try {
    const response = await $axios.get(url);
    const weather = response.data;
    // return Response.json({ weather });
    return NextResponse.json({ weather }, { headers: corsHeaders });
  } catch (error) {
    throw error;
    // console.error('Error fetching weather data:', error);
    // return Response.json(
    //   { error: 'Failed to fetch weather data' },
    //   { status: 500 },
    // );
  }
}
