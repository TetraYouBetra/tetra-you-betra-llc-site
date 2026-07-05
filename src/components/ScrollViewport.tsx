import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { sunken, win95 } from '../theme/win95Theme';
import type { SxProps, Theme } from '@mui/material/styles';
import Scrollbar from './Scrollbar';

type ScrollViewportProps = Omit<BoxProps, 'width' | 'height'> & {
  children: React.ReactNode;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  maxHeight?: React.CSSProperties['maxHeight'];
  sx?: SxProps<Theme>;
};

export default function ScrollViewport({
  children,
  width = '100%',
  height = '100%',
  maxHeight,
  sx,
  ...props
}: ScrollViewportProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = React.useState({
    x: false,
    y: false,
  });

  const updateOverflow = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    setOverflow({
      x: el.scrollWidth > el.clientWidth + 1,
      y: el.scrollHeight > el.clientHeight + 1,
    });
  }, []);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(el);

    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    return () => resizeObserver.disconnect();
  }, [updateOverflow]);

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        maxHeight,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: win95.white,
        color: win95.text,
        boxShadow: sunken,
        p: '2px',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        ref={viewportRef}
        {...props}
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          minWidth: 0,
          overflow: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
          },

          pr: overflow.y ? '17px' : 0,
          pb: overflow.x ? '17px' : 0,
        }}
      >
        {children}
      </Box>

      <Scrollbar
        axis="vertical"
        viewportRef={viewportRef}
        visible={overflow.y}
        hasOtherScrollbar={overflow.x}
      />

      <Scrollbar
        axis="horizontal"
        viewportRef={viewportRef}
        visible={overflow.x}
        hasOtherScrollbar={overflow.y}
      />

      {overflow.x && overflow.y && (
        <Box
          sx={{
            position: 'absolute',
            right: 2,
            bottom: 2,
            width: 17,
            height: 17,
            backgroundColor: win95.face,
            boxShadow: sunken,
            zIndex: 3,
          }}
        />
      )}
    </Box>
  );
}
