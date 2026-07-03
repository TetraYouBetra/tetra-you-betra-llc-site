import Box from '@mui/material/Box';

export default function TaskIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: 16,
        height: 16,
        flexShrink: 0,
        imageRendering: 'pixelated',
      }}
    />
  );
}
