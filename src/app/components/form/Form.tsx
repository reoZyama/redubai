import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ScrollingText from './ScrollingText';

export default function Form() {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('24px'); // 文字サイズの状態を追加
  const [fontStretch, setFontStretch] = useState('normal'); // 文字の横長さの状態を追加
  const [color, setColor] = useState('black'); // 文字の色の状態を追加
  const [text, setText] = useState('');

  useEffect(() => {
    const randomFont = () => {
      const fonts = [
        'Arial',
        'Helvetica',
        'Times New Roman',
        'Comic Sans MS',
        'Courier New',
        'Impact',
        'Arial Black',
        'Verdana',
        'Trebuchet MS',
        'Georgia',
        'Meiryo',
        'MS Gothic',
        'MS Mincho',
      ];
      const randomIndex = Math.floor(Math.random() * fonts.length);
      setFontFamily(fonts[randomIndex]);
    };

    const randomFontSize = () => {
      const minFontSize = 1; // 最小文字サイズ
      const maxFontSize = 100; // 最大文字サイズ
      const randomSize =
        Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) +
        minFontSize;
      setFontSize(`${randomSize}px`); // 文字サイズを更新
    };

    const randomFontStretch = () => {
      const stretches = [
        'normal',
        'condensed',
        'expanded',
        'extra-condensed',
        'extra-expanded',
        'semi-condensed',
        'semi-expanded',
      ];
      const randomStretchIndex = Math.floor(Math.random() * stretches.length);
      setFontStretch(stretches[randomStretchIndex]); // 文字の横長さを更新
    };

    const randomColor = () => {
      const randomR = Math.floor(Math.random() * 256); // 0から255のランダムな数値を生成
      const randomG = Math.floor(Math.random() * 256); // 0から255のランダムな数値を生成
      const randomB = Math.floor(Math.random() * 256); // 0から255のランダムな数値を生成
      const randomColor = `rgb(${randomR}, ${randomG}, ${randomB})`; // RGB形式でランダムな色を生成
      setColor(randomColor); // 文字の色を更新
    };

    const interval = setInterval(() => {
      randomFont();
      randomFontSize(); // 文字サイズをランダムに変更する関数を追加
      randomFontStretch(); // 文字の横長さをランダムに変更する関数を追加
      randomColor(); // 文字の色をランダムに変更する関数を追加
    }, 3000); // 5秒ごとに文字の形、サイズ、横長さ、色が変化するように変更
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container px={4}>
      <Grid item xs={12}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          fontStretch: fontStretch,
          color: color,
        }}
      >
        なんでもかいてね
      </Typography>
      <TextField
          placeholder="なんでもかいてね"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxRows={4}
          minRows={4}
          multiline
        />
        <ScrollingText text={text} duration={2} />
      </Grid>
    </Grid>
  );
}
