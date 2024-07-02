type Response = {
    temp_c: number
}

/**
 * TODO: 後から実装
 * @doc https://www.weatherapi.com/docs/#apis-realtime
 */
const useCurrentWeather = () => {
    const data: Response = {
        temp_c: 8.7
    }

    return {
        data,
    }
}

export default useCurrentWeather;
