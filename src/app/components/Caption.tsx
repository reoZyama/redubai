import { Typography, Box } from '@mui/material';

export default function Caption() {
  return (
    <Box display="flex" justifyContent="center" width="100%" p={4}>
      <Typography variant="caption" textAlign="center">
        新しい世界を探検しました。 <br />
        ドバイ共和国の建築、政治、またイスラム教の幾何学模様などから『構え』をテーマにコーディングを用いて半永久的に変化し続けるモーションを制作しました。
      </Typography>
    </Box>
  );
}