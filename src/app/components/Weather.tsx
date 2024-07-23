import React, { useEffect } from 'react';
import useCurrentWeather from '../hooks/useCurrentWeather';
import { Box, CircularProgress, Typography } from '@mui/material';

const tempColorMap: { [key: number]: string } = {
  0: '#0000FF', // 青 (寒い)
  10: '#00FFFF', // シアン (涼しい)
  20: '#00FF00', // 緑 (適温)
  30: '#FF0000', // 黄色 (暖かい)
  45: '#e00000', // 紫 (暑い)
} as const;

export default function Weather() {
  const { data } = useCurrentWeather();

  /**
   * 温度から色を取得する
   * @param temp 温度
   * @returns カラーコード
   */
  const getTempColor = (temp: number): `#${string}` => {
    const keys = Object.keys(tempColorMap)
      .map(Number)
      .sort((a, b) => a - b);
    const lowerKey = keys.find((key) => key <= temp) || keys[0];
    const upperKey = keys.find((key) => key > temp) || keys[keys.length - 1];

    if (lowerKey === upperKey) {
      return tempColorMap[lowerKey] as `#${string}`;
    }

    const ratio = (temp - lowerKey) / (upperKey - lowerKey);
    const lowerColor = tempColorMap[lowerKey] as `#${string}`;
    const upperColor = tempColorMap[upperKey] as `#${string}`;

    return interpolateColor(lowerColor, upperColor, ratio) as `#${string}`;
  };

  /**
   * 2つの色を補間する
   * @param color1
   * @param color2
   * @param ratio
   * @returns
   */
  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    const hex = (c1: number, c2: number) =>
      Math.round(c1 + (c2 - c1) * ratio)
        .toString(16)
        .padStart(2, '0');

    const r = hex(
      parseInt(color1.slice(1, 3), 16),
      parseInt(color2.slice(1, 3), 16),
    );
    const g = hex(
      parseInt(color1.slice(3, 5), 16),
      parseInt(color2.slice(3, 5), 16),
    );
    const b = hex(
      parseInt(color1.slice(5, 7), 16),
      parseInt(color2.slice(5, 7), 16),
    );

    return `#${r}${g}${b}`;
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data ? (
    <div>
      {/* <Typography variant="h4">
        今日の雲の量は {data.weather.current.cloud} です。
      </Typography> */}
      <Typography variant="h4">
        現在の気温は {data.weather.current.temp_c}°c です。
      </Typography>
      <Typography variant="h4">
        湿度は{data.weather.current.humidity}%です。
      </Typography>
      <Box
        sx={{
          backgroundColor: getTempColor(data.weather.current.temp_c),
          width: '1512px',
          height: '100px',
        }}
      ></Box>
    </div>
  ) : (
    <CircularProgress />
  );
}
