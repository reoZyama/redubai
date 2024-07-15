import useSWR from 'swr';

type ResponseDto = {
  weather: {
    current: {
      last_updated: string;
      last_updated_epoch: number;
      temp_c: number;
      temp_f: number;
      feelslike_c: number;
      feelslike_f: number;
      windchill_c: number;
      windchill_f: number;
      heatindex_c: number;
      heatindex_f: number;
      dewpoint_c: number;
      dewpoint_f: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      is_day: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
    };
    location: {
      country: string;
      lat: number;
      localtime: string;
      localtime_epoch: number;
      lon: number;
      name: string;
      region: string;
      tz_id: string;
    };
  };
};

/**
 * @doc https://www.weatherapi.com/docs/#apis-realtime
 */
const useCurrentWeather = () => {
  /**
   * latitude and longitude
   * Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
   */
  const q = '25.2048,55.2708';

  const url = `/api/weathers?q=${q}`;
  const { data, mutate, error } = useSWR<ResponseDto>(() => url);

  const fetch = () => mutate(data);

  return {
    data,
    fetch,
    error,
  };
};

export default useCurrentWeather;
