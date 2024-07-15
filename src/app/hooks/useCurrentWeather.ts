import useSWR from 'swr';

type ResponseDto = {
  temp_c: number;
};

/**
 * @doc https://www.weatherapi.com/docs/#apis-realtime
 */
const useCurrentWeather = () => {
  // const data: Response = {
  //   temp_c: 8.7,
  // };

  const url = `/current.json`;
  const { data, mutate, error } = useSWR<ResponseDto>(() => url);

  const fetch = () => mutate(data);

  return {
    data,
    fetch,
    error,
  };
};

export default useCurrentWeather;
