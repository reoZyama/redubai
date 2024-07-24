import { keyframes } from "@emotion/react";
import { Box } from "@mui/system";

interface ScrollingTextProps {
    text: string;
    duration?: number;
  }
  
  const scrollKeyframes = keyframes`
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  `;

export default function ScrollingText({ text, duration = 5 }: ScrollingTextProps) {
    return (
        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              animation: `${scrollKeyframes} ${duration}s linear infinite`,
            }}
          >
            {text}
          </Box>
        </Box>
      );
}